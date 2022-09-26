import React, {useState} from "react";
// import Datafilter from "./Datafilter";
import Datatable5 from "./Datatable5";
import DataEdit from "./DataEdit";
import Footer from "./Footer";
// import PrintMap from './PrintMap';
import Map from "./Map";
import PrintReportBtn from "../assets/print-icon.svg";

const Home = () => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="custom-container">
      <div className="print-report">
        <p className="report-status">Search Location</p>
        <button className="print-report-btn">
          <img src={PrintReportBtn} alt="" />
        </button>
      </div>
      <Map />

      <p className="report-status entries-title">
        Received Entries
        <button className="btn btn-sm btn-warning ms-4" onClick={() => editMode ? setEditMode(false) : setEditMode(true)}>{ editMode ? "Go Back" : "Group Edits"}</button>
      </p>
      {
        editMode ?
        <DataEdit />
        :
        <Datatable5 />        
      }
      
      {/* <Datafilter /> */}
      {/* <PrintMap /> */}
      <Footer />
    </div>
  );
};

export default Home;
