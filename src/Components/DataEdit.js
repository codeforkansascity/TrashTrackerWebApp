// Here is some code that might be better than the solution we currently use. Added it here for future reference:
// https://stackoverflow.com/questions/70656687/react-dynamic-form-input/70657356#70657356

import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import customFetch from "./Fetch";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";
import DataCategory from "./DataCategory";

const DataEdit = () => {
  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";
  const putOrPostUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio";

  // Fetch data for editing entries when the component is mounted
  useEffect(() => {
    fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[]) // [] indicates that useEffect will only fire once when component is rendered (it won't rerender if state changes)

  // Add function that update formData and send PUT request to the database
  const updateTrashLocationCategory = (e) => {
    for (let i=0; i<formData.length; i++) {
      if (e.target.id === formData[i].body) { // Filter the specific report where a trash report is edited

        // Validate if users cleared the trash name or location
        let newName = document.getElementsByClassName("trash")[i].value;
        let newLocation = document.getElementsByClassName("location")[i].value;
        if ( !newName && !newLocation ) {
          return alert("Sorry, please enter a description and an address for the trash item.")
        } else if ( !newName ) {
          return alert("Sorry, please enter a description for the trash item.")
        } else if ( !newLocation ) {
          return alert("Sorry, please enter an address for the trash item.")
        }

        // Update the state of trash name, location, and POST request options
        formData[i].trash_name = newName;
        formData[i].location = newLocation;

        if (newCategory1 !== "") {formData[i].category = newCategory1};

        let requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Origin': 'request-originating server addresses',
          body: JSON.stringify(formData[i])
        };

        // Send editing request to DynamoDB
        customFetch(putOrPostUrl, requestOptions);
      }
    }
  };

  // Add function that hides a trash report when users click on "delete" button
  const hideReport = (e) => {
    for (let i=0; i<formData.length; i++) {
      if (e.target.id === formData[i].body) { // Filter the specific report where a trash report is edited
        // Update the state of trash name, location, and PUT request options
        formData[i].status = "completed";
        let requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Origin': 'request-originating server addresses',
          body: JSON.stringify(formData[i])
        };

    customFetch(putOrPostUrl, requestOptions);
  }}}

  let newCategory1;

  const updateCategoryinDatabase = (newCategory) => {
    newCategory1 = newCategory;
    return newCategory1;
  }

  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col" className="thumb-col"></th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="data-table">
          {formData.map((element) => (
            <tr className="data-row" key={element.body}>
              <td>
                <a href={element.photo_url} target="_blank">
                  <Img
                    src={[element.photo_url, DefaultImage]}
                    alt="not available"
                    className="custom-photo"
                  />
                </a>
              </td>
              <td>
                <textarea type="text" className="form-control location" defaultValue={element.location}></textarea>
              </td>
              <td>
                <textarea type="text" className="form-control trash" defaultValue={element.trash_name}></textarea>
              </td>
              {/* <td>
                {element.report_from.slice(2, 5) +
                  "-" +
                  element.report_from.slice(5, 8) +
                  "-" +
                  element.report_from.slice(8)}
              </td>
              <td>{element.report_date.slice(0, 10)}</td> */}
              <td><DataCategory category={element.category} updateCategoryinDatabase={updateCategoryinDatabase} /></td>
              <td>
                <button className="btn btn-sm btn-primary" id={element.body} onClick={updateTrashLocationCategory}>Update</button>&nbsp; 
                <button className="btn btn-sm btn-danger" id={element.body} onClick={hideReport}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataEdit;
