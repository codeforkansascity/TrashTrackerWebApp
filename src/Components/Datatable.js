import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";

const Datatable = () => {
  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";

  // Fetch data for editing entries when the component is mounted
  useEffect(() => {
    fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[]) // [] indicates that useEffect will only fire once when component is rendered (it won't rerender if state changes)
  
  useEffect(() => {
    let e = document.getElementById("select");

    const configureSelectedDate = () => {
      let selected = e.options[e.selectedIndex].value;
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let selectedDate = `${year}-${month}`;
      switch(selected) {
        case "0":
          if (month < 10) {
            return selectedDate = `${year}-0${month}`;
          } else
          return selectedDate = `${year}-${month}`;
        case "1":
          if (month-1 < 10) {
            return selectedDate = `${year}-0${month-1}`;
          } else
          return selectedDate = `${year}-${month-1}`;
        case "2":
          if (month-2 < 10) {
            return selectedDate = `${year}-0${month-2}`;
          } else
          return selectedDate = `${year}-${month-2}`;
        case "3":
          if (month-3 < 10) {
            return selectedDate = `${year}-0${month-3}`;
          } else
          return selectedDate = `${year}-${month-3}`;
        default:
          return selectedDate = "";
      }
    };

    const filterDate = () => {
      let selectedDate = configureSelectedDate();      
      const filterUrl = `https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/date?selectedDate=${selectedDate}`;
      console.log(filterUrl);
      // fetch(filterUrl)
      //   .then((res) => res.json())
      //   .then((reports) => setFormData(reports))
      //   .catch(err => console.error(err));
    };
      
    e.addEventListener("change", filterDate);
})

  return (
    <div>
      <div class="col-6 mt-2 mb-5 mx-auto">
        <label for="formGroupExampleInput" class="form-label">Date Filters</label>
        <select class="form-select form-select-lg mb-3" id="select" aria-label=".form-select-lg example">
          <option value="false" selected>All Months</option>
          <option value="0">Current Month</option>
          <option value="1">Past 1 Month</option>
          <option value="2">Past 2 Months</option>
          <option value="3">Past 3 Months</option>
        </select>
      </div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col" className="thumb-col"></th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>
            <th scope="col">Reported by</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody id="data-table">
          {formData.map((element) => (
            <tr className="data-row">
              <td>
                <a href={element.photo_url} target="_blank" rel="noreferrer">
                  <Img
                    src={[element.photo_url, DefaultImage]}
                    alt="not available"
                    className="custom-photo"
                  />
                </a>
              </td>
              <td>
                {element.location.charAt(0).toUpperCase() +
                  element.location.slice(1)}
              </td>
              <td>
                {element.trash_name.charAt(0).toUpperCase() +
                  element.trash_name.slice(1)}
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
                <button className="btn-status">New</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Datatable;