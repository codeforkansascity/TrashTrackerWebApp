import React, { useState, useEffect } from 'react';
import './Datatable.css';

function Datatable2() {
  return (
    <section id="main-table">
      <div className="container">
        <div className="row">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Trash</th>
                <th scope="col">Location</th>
                <th scope="col">Reported from</th>
                <th scope="col">Date</th>
                <th scope="col">Photo</th>
                <th scope="col">Status</th>
                <th scope="col">Edit/Del</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>13 gal bag</td>
                <td>Map</td>
                <td>816-888-1479</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Mattress</td>
                <td>Map</td>
                <td>816-445-0985</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Large trash bag</td>
                <td>Map</td>
                <td>816-202-4857</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Couch</td>
                <td>Map</td>
                <td>816-347-2218</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br/><br/><br/>
    </section> 
  );
}

export default Datatable2;
