import React, { useState, useEffect } from 'react';
import './Datatable.css';
import { API } from 'aws-amplify';

const myAPI = "trashTrackerRESTApi"
const path = '/'; 

const Datatable3 = () => {
    function send(e) {
        API.get(myAPI, path)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error)
        })
    }
    return (
        <button onClick={() => send()}>Send</button>
    )
}

export default Datatable3;