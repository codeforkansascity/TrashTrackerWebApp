import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";

function DataEdit() {
  const [formData, setFormData] = useState([]); 

  const handleTrashChange = (e) => { 
    for (let i=0; i<formData.length; i++) {
      if (e.target.name === formData[i].body) { // Filter the specific report where a trash report is edited
        if (e.target.className === "form-control trash") { // Identify whether user edited trash name or location
          formData[i].trash_name = e.target.value
          return
        } else {
          return formData[i].location = e.target.value
        }
      }
    }
  }

  useEffect(() => {
    fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body")
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[]) // [] indicates that useEffect doesn't depend on state or props so it won't rerender if state changes and will only fire once when component is rendered
 
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
                  class="custom-photo"
                />
              </td>
              <td>
                <textarea name={element.body} type="text" className="form-control location" defaultValue={element.location} onChange={handleTrashChange}></textarea>
              </td>
              <td>
                <textarea name={element.body} type="text" className="form-control trash" defaultValue={element.trash_name} onChange={handleTrashChange}></textarea>
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
                <button className="btn btn-sm btn-primary" onClick={setFormData}>Update Data</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataEdit;
