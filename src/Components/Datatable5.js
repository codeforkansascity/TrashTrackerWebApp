import React from "react";
import { Img } from "react-image";
import "./Datatable.css";
import DefaultImage from "../assets/image-not-provided.svg";
import Loader from "../assets/loader.gif";

const openModal = () => {
  var modal = document.getElementById("my-modal");
  var overlay = document.getElementById("overlay");
  var btnCloseModal = document.getElementsByClassName("close-modal");

  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  //   btnCloseModal.addEventListener("click");
  //   overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
};

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
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody id="data-table">
                {items.map((item) => (
                  <tr className="data-row">
                    <td>
                      <Img
                        src={[item.photo_url, DefaultImage]}
                        alt="not available"
                        className="custom-photo"
                        onClick={openModal}
                      />
                    </td>
                    <td>{item.location}</td>
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
                      <button className="btn-del">New</button>
                    </td>
                    <div className="dynamic-modal">
                      <div className="hidden modal" id="my-modal">
                        <button className="" id="close-modal">
                          &times;
                        </button>
                        <div id="modal-content">
                          <Img
                            className="modal-img"
                            src={[item.photo_url, DefaultImage]}
                            alt="Full Size Image"
                          />
                        </div>
                        <div className="hidden" id="overlay"></div>
                      </div>
                    </div>
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
