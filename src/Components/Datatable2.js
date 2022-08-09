import React, { useState, useEffect } from 'react';
import './Datatable.css';
import { API } from 'aws-amplify';

const myAPI = "trashTrackerRESTApi"
const path = '/trash'; 

const Datatable2 = () => {
  const [input, setInput] = useState("")
  const [trashs, setTrashs] = useState([])

  //Function to fetch from our backend and update trashs array
  function getTrash(e) {
    let trashId = e.input
    API.get(myAPI, path + "/" + trashId)
       .then(response => {
         console.log(response)
         let newTrashs = [...trashs]
         newTrashs.push(response)
         setTrashs(newTrashs)

       })
       .catch(error => {
         console.log(error)
       })
  }

  return (
    <div className="App">
      <div>
          <input placeholder="trash id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getTrash({input})}>Get trash From Backend</button>

      <h2 style={{visibility: trashs.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       trashs.map((thisTrash, index) => {
         return (
        <div key={thisTrash.trashId}>
          <span><b>trashId:</b> {thisTrash.trashId} - <b>trashName</b>: {thisTrash.trashName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default Datatable2; 