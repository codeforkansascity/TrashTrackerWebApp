/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_TWILIOSTORAGE_ARN
	STORAGE_TWILIOSTORAGE_NAME
	STORAGE_TWILIOSTORAGE_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "twilioStorage";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "body";
const partitionKeyType = "S";
const sortKeyName = "report_date";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/twilio";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/' + partitionKeyName; 
const sortKeyPath = hasSortKey ? '/' + sortKeyName : '';
const customKeyPath = "/date";

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "PUT,DELETE,GET")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/********************************
 * HTTP Get method for list objects * e.g., /twilio/body
 ********************************/

app.get(path + hashKeyPath, function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition,
    FilterExpression: '#status <> :status', // added the filter that only returns items that their status is not equal to "completed"
    ExpressionAttributeNames: {
      "#status":"status"
    },
    ExpressionAttributeValues: {
      ":status":"completed"
    }
  }

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

/********************************
 * HTTP Get method for list objects in a date range * e.g., /twilio/date
 ********************************/

app.get(path + customKeyPath, function(req, res) {
  const selectedDate = req.query.selectedDate;
  let queryParams = {
    TableName: tableName,
    FilterExpression: "begins_with(#report_date, :date) AND #status <> :status",
    ExpressionAttributeNames: {
      "#report_date":"report_date",
      "#status":"status"
    },
    ExpressionAttributeValues: {
      ":date": selectedDate,
      ':status':"completed"
    }
  }

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  })
})

/*****************************************
 * HTTP Get method for get single object * e.g., /twilio/object/body/report_date
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});

/************************************
* HTTP put method for insert object; Usually used for users deleting reports on the website *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else{
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});

/************************************
* HTTP post method for insert object; *
* Usually used for Twilio sending reports data to DynamoDB, or receiving users edits on location * 
*************************************/

app.post(path, function(req, res) {
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  // Get geo coordinates from req.body.location
  let amazonLocationService = new AWS.Location();
  let address = req.body.location; 
  let params; // Parameters to be passed into Amazon Location Service 
  let coordinates; // Coordinates to be generated by Amazon Location Service
  let putItemParams; // Parameters to be passed into DynamoDB (required for the POST request)
  let insertDataIntoDynamoDB = () => { // Function that inserts data from req.body into DynamoDB
    putItemParams = {
      TableName: tableName,
      Item: req.body,
    };

    dynamodb.put(putItemParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url, body: req.body});
      } else {
        res.json({success: 'post call succeed!', url: req.url, data: data})
      }
    });
  }

  if (!req.body.latitude && !req.body.longitude) { // If users edit coordinates themselves, backend shouldn't calcuate coordinates
    if (address) {
      params = {
        "IndexName": "trashLocationSearch-staging",
        "Text": address,
        "BiasPosition": [-94.58316695554774,39.103642515847355],
        "MaxResults": 5,
      };

      amazonLocationService.searchPlaceIndexForText(params, function(err, data) {
        if (err) {
          console.log("PlaceIndexError || at app.js in lambda in backend" + JSON.stringify(err, undefined, 2))
        } else {
          // console.log(JSON.stringify(data, undefined, 2)); // Logging all search results from the "Text"
          coordinates = data.Results[0].Place.Geometry.Point;    
          const label = data.Results[0].Place.Label;    
          if (coordinates) {
            req.body = {...req.body, longitude: coordinates[0], latitude: coordinates[1]};
            insertDataIntoDynamoDB();
          } else {
            insertDataIntoDynamoDB();
          }
        }
      })
    } else {
      insertDataIntoDynamoDB();
    }
  }

});

/************************************
* HTTP post method for insert object * Usually used for getting coordinates when users search address in the map
* Still under testing
*************************************/

app.post(path + "/geocode", function(req, res) {
  // Get geo coordinates from req.body
  let amazonLocationService = new AWS.Location();
  let params = { // Parameters to be passed into Amazon Location Service 
    "IndexName": "trashLocationSearch-staging",
    "Text": req.body,
    "BiasPosition": [-94.58316695554774,39.103642515847355],
    "MaxResults": 3,
  }; 

  amazonLocationService.searchPlaceIndexForText(params, function(err, data) {
    if (err) {
      console.log("PlaceIndexError || at app.js in lambda in backend" + JSON.stringify(err, undefined, 2));
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      // console.log(JSON.stringify(data, undefined, 2)); // Logging all search results from the "Text"
      let coordinates = data.Results[0].Place.Geometry.Point;    
      const label = data.Results[0].Place.Label;    
      if (coordinates) {
        res.json({success: 'post call succeed! coordinates generated.', url: req.url, data: JSON.stringify(coordinates)})
      } else {
        res.json({success: 'post call succeed! coordinates not generated.', url: req.url, data: ""})
      }
    }
  })
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
