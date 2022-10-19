import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";

const Datatable = () => {
  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";

  useEffect(() => {
    getUrlFetch()
  },[]) // [] indicates that useEffect will only fire once when component is rendered (it won't rerender if state changes)
  // If a state is put in [], useEffect only fires when that state changes

  const getUrlFetch = async () => {
    // Fetch data for report entries when the component is mounted
    await fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));

    // Fetch filtered data for report entries when users use date filters
    await filterReports();
  }
  
  const filterReports = () => {
    let e = document.getElementById("select");

    const configureSelectedDate = () => {
      // Configure selectedDate to be used as fetch url query value
      let selected = e.options[e.selectedIndex].value;
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let selectedDate = `${year}-${month}`;
      switch(selected) {
        case "0":
          if (month < 10) {
            return selectedDate = `${year}-0${month}`;
          } else {
            return selectedDate = `${year}-${month}`;
          }
        case "1":
          if (month-1 < 10) {
            return selectedDate = `${year}-0${month-1}`;
          } else {
            return selectedDate = `${year}-${month-1}`;
          }
        case "2":
          if (month-2 < 10) {
            return selectedDate = `${year}-0${month-2}`;
          } else {
            return selectedDate = `${year}-${month-2}`;
          }
        case "3":
          if (month-3 < 10) {
            return selectedDate = `${year}-0${month-3}`;
          } else {
            return selectedDate = `${year}-${month-3}`;
          }
        default:
          return selectedDate = false;
      }
    };

    const requestFilteredData = async (filterUrl) => {
      // Add fetch request
      await fetch(filterUrl)
        .then((res) => res.json())
        .then((reports) => setFormData(reports))
        .catch(err => console.error(err));
    };

    const filterDate = () => {
      // Fetch filtered data through new filter url
      let selectedDate = configureSelectedDate();
      if (selectedDate) {
        const filterUrl = `https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/date?selectedDate=${selectedDate}`;
        return requestFilteredData(filterUrl);
      } else {
        const filterUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";
        return requestFilteredData(filterUrl);
      };
    };
      
    // When users use date filters, start the function filterDate
    e.addEventListener("change", filterDate);
  }

  return (
    <div className="container">
      <div className="col-6 mt-2 mb-5 mx-auto">
        <label for="formGroupExampleInput" class="form-label">Date Filters</label>
        <select class="form-select form-select-lg mb-3" id="select" aria-label=".form-select-lg example">
          <option value="false" selected>All Months</option>
          <option value="0">Current Month</option>
          <option value="1">1 Month Ago</option>
          <option value="2">2 Months Ago</option>
          <option value="3">3 Months Ago</option>
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
          {
            formData.map((element) => (
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
            )) 

        }
        </tbody>
      </table>
      <div className="mt-5 mb-5 ms-5">
        { formData.length === 0 ? "No reports available." : "" }
      </div>
    </div>
  )
}

export default Datatable;