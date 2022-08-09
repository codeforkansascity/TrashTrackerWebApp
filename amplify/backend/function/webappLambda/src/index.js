

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const trashId = event.pathParameters.trashId;
    const trash = {'trashId': trashId, 'trashName': "Trash " + trashId};
    const response = {
        statusCode: 200,
    // below is to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(trash),
    };
    return response;
};