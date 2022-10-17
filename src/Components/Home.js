import React, {useState} from "react";
// import Datafilter from "./Datafilter";
import Datatable from "./Datatable";
import Datatable3 from "./Datatable3";
import DataEdit from "./DataEdit";
import Footer from "./Footer";
// import PrintMap from './PrintMap';
import Map from "./Map";
import PrintReportBtn from "../assets/print-icon.svg";

const Home = () => {
  const [editMode, setEditMode] = useState(false);

  const print = () => {
    window.print();
  };

  return (
    <div className="custom-container">
      <div className="print-report">
        <p className="report-status">Search Location</p>
        <button className="print-report-btn"  onClick={print}>
          <img src={PrintReportBtn} alt="" />
        </button>
      </div>
      <Map />

      <p className="report-status entries-title">
        Received Entries
        <button className="btn btn-sm btn-warning ms-4" onClick={() => editMode ? setEditMode(false) : setEditMode(true)}>
          {editMode ? "Go Back" : "Edit"}
        </button>
      </p>

      {/* <Datafilter /> */}

      {/* Display data upon loading the page; show edit areas when users clicked on Edit button */}
      {
        editMode ?
        <DataEdit />
        :
        <Datatable />        
      }
        <Datatable3 />    
      {/* <PrintMap /> */}
      <Footer />
    </div>
  );
};

export default Home;
