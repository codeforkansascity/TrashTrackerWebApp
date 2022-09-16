import React from "react";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";
import Loader from "../assets/loader.gif";

class Datatable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }
  componentDidMount() {
    fetch(
      "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body"
    )
      .then((res) => res.json())
      .then((reports) => {
        this.setState({
          items: reports,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div className="loader">
          <h5>Loading table.... </h5>
          <img src={Loader} alt="loading" />
        </div>
      );

    return (
      <section id="main-table">
        <div className="container">
          <div className="row">
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
                {items.map((item) => (
                  <tr className="data-row">
                    <td>
                      <Img
                        src={[item.photo_url, DefaultImage]}
                        alt="not available"
                        class="custom-photo"
                      />
                    </td>
                    <td>{item.location.slice(9)}</td>
                    <td>
                      {item.trash_name.charAt(0).toUpperCase() +
                        item.trash_name.slice(1)}
                    </td>

                    <td>
                      {item.report_from.slice(2, 5) +
                        "-" +
                        item.report_from.slice(5, 8) +
                        "-" +
                        item.report_from.slice(8)}
                    </td>
                    <td>{item.report_date.slice(0, 10)}</td>
                    <td>
                      <button className="btn-del">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default Datatable;
