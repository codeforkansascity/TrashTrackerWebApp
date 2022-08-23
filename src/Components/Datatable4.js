// This file can successfully return a response that contains all data from DynamoDB.
// It currently can only be accessed through the networking tab and the console from the developer tool. 
import React, { Component } from 'react';
import { Get } from 'react-axios';
const axios = require('axios').default;

// Make a request for a user with a given ID
axios.get("REST_API_ENDPOINT") // change REST_API_ENDPOINT
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

export default class Datatable4 extends Component {
render() {
    return ( 
      <Get url="REST_API_ENDPOINT" > 
        {(error, response, isLoading, makeRequest, axios) => {
          if(error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if(isLoading) {
            return (<div>Loading...</div>)
          }
          else if(response !== null) {
            return (<div>{response.data.message} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    );
}
}