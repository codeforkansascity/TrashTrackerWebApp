import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";

const Datatable = () => {
  /********** Fetch data for report entries when the component is mounted ************/
  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";

  useEffect(() => {
    getUrlFetch()
  },[]) 

  const getUrlFetch = async () => {
    await fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  } 

  /********** Add methods to filter data by date ************/
  // Configure selectedDate to be used as fetch url query value
  const configureSelectedDate = (value) => {
    let selected = value;
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

  // Configure fetch request
  const requestFilteredData = async (filterUrl) => {
    await fetch(filterUrl)
      .then((res) => res.json())
      .then((reports) => setFormData(reports))
      .catch(err => console.error(err));
  };

  // Fetch filtered data through new filter url
  const filterDate = (selectedDate) => {
    if (selectedDate) {
      const filterUrl = `https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/date?selectedDate=${selectedDate}`;
      return requestFilteredData(filterUrl);
    } else {
      const filterUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";
      return requestFilteredData(filterUrl);
    };
  };

  // Add a function to solicit the value of selectedDate from the child component <Filters /> when the value changes
  const filterByDate = (value) => {
    if (value === "close") { // For convenience, here is added a method to clear the filter effect when users click on "Close" for filters
      getUrlFetch();
    } else {
      let selectedDate = configureSelectedDate(value);
      filterDate(selectedDate);
    }
  };

  /********** Add methods to filter data by category ************/
  const filterByCategory = (value) => {
    let selectedCategory = value;
    const filterCategory = (selectedCategory) => {
      if (selectedCategory !== "select") {
        const filterUrl = `https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/filter_category?selectedCategory=${selectedCategory}`;
        return requestFilteredData(filterUrl);
      } else {
        const filterUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";
        return requestFilteredData(filterUrl);
      };
    };
    filterCategory(selectedCategory);
  };

  return (
    <div className="container">
      <Filters filterByDate={filterByDate} filterByCategory={filterByCategory} />
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col" className="thumb-col"></th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>
            <th scope="col">Reported by</th>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody id="data-table">
          {
            formData.map((element) => (
              <tr className="data-row" key={element.body} >
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
                  <button className="btn-status">
                    {element.category ? element.category : "New"}
                  </button>
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