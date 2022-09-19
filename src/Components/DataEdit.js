// Here is some code that might be better than the solution we currently use. Added it here for future reference:
// https://stackoverflow.com/questions/70656687/react-dynamic-form-input/70657356#70657356

import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";

function DataEdit() {
  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";
  const putUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio";

  // Fetch data for editing entries when the component is mounted
  useEffect(() => {
    fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[]) // [] indicates that useEffect will only fire once when component is rendered (it won't rerender if state changes)

  // Add function that update formData and send PUT request to the database
  const updateTrashAndLocation = (e) => {
    for (let i=0; i<formData.length; i++) {
      if (e.target.id === formData[i].body) { // Filter the specific report where a trash report is edited
        // Update the state of trash name, location, and PUT request options
        formData[i].trash_name = document.getElementsByClassName("trash")[i].value;
        console.log(document.getElementsByClassName("trash")[i].value);
        formData[i].location = document.getElementsByClassName("location")[i].value;
        let requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Origin': 'request-originating server addresses',
          body: formData[i]
        };

        console.log(typeof requestOptions.body);
        // Send PUT request to DynamoDB
        fetch(putUrl, requestOptions)
          // .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            alert("Success! Please refresh the page to view your changes.")
          })
          .catch(error => {
              console.error('Error:', error);
              alert("Something went wrong! Please contact the administrator.")
          });
      }
    }
  };

  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col" className="thumb-col"></th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="data-table">
          {formData.map((element) => (
            <tr className="data-row">
              <td>
                <Img
                  src={[element.photo_url, DefaultImage]}
                  alt="not available"
                  className="custom-photo"
                />
              </td>
              <td>
                <textarea type="text" className="form-control location" defaultValue={element.location}></textarea>
              </td>
              <td>
                <textarea type="text" className="form-control trash" defaultValue={element.trash_name}></textarea>
              </td>
              <td>
                {element.report_from.slice(2, 5) +
                  "-" +
                  element.report_from.slice(5, 8) +
                  "-" +
                  element.report_from.slice(8)}
              </td>
              <td>{element.report_date.slice(0, 10)}</td>
              <td>
                <button className="btn btn-sm btn-primary" id={element.body} onClick={updateTrashAndLocation}>Update Data</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataEdit;
