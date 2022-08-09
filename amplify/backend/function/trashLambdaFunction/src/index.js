/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["TWILIO_AUTH_TOKEN"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	TWILIO_ACCOUNT_SID
	TWILIO_AUTH_TOKEN
	TWILIO_NUMBER
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

/* Note: this file does not work; there's CORS error and I'm still working on its http request
* I'm working on backend http first. If it worked out, we might not need REST Api in this repo
*/

const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const html = fs.readFileSync('index.html', { encoding:'utf8' });
 
app.use(cors());

app.get('/trash/:trashId', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(1337, function () {
    console.log('CORS-enabled web server listening on port 1337')
})

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html,
    };
    return response;
};

// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     const accountSid = process.env.ACCOUNT_SID;
//     const twilioNum = process.env.TWILIO_NUMBER;
//     const client = require('twilio')(accountSid, authToken);

//     // client.messages.create({
//     //     body: 'Hello from Lambda!',
//     //     to: '+18169747106',  
//     //     from: twilioNum 
//     // })
//     //     .then((message) => {
//     //         callback(null, message.sid);
//     //     })
//     //     .catch((e) => {
//     //         callback(Error(e));
//     //     });

//     const response = {
//         statusCode: 200,
//     // below is to enable CORS requests
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Headers": "*",
//             "Access-Control-Allow-Credentials" : true
//         }, 
//         body: JSON.stringify({ "message": "Hello World!" }),
//     };

//     return response;
// };