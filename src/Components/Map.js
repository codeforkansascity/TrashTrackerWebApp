import { React, useState, useEffect } from "react";
import { MapView, LocationSearch, Heading, Text } from "@aws-amplify/ui-react";
import { Marker, Popup } from 'react-map-gl';
import "@aws-amplify/ui-react/styles.css";
import "./Map.css";
import customFetch from "./Fetch";

// Map Display Style:
// Streets style looks a bit dull;
// Imagery style doesn't have street name - it's like satellite view;
// Currently using Navigation style;
// Previews are available on Amazon Location Services console

// Reference: https://ui.docs.amplify.aws/react/connected-components/geo
// See the section on Usage with react-map-gl


const putOrPostUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio";
const dragToEditUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/drag-to-edit";
const geocodeUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/geocode";


const MarkerWithPopup = ({ latitude, longitude, heading, location, body, report_date, report_from, photo_url }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [trash, setTrash] = useState("");
  const [address, setAddress] = useState("");

  const handleMarkerClick = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
  };

  // Update coordinates after users drag marker on the map 
  const recordDraggedMarker = (e) => {
    const draggedLongitudeLatitude = e.target.getLngLat();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      'Access-Control-Allow-Origin': 'request-originating server addresses',
      body: JSON.stringify({
        trash_name: heading, 
        location: location, 
        body: body, 
        report_date: report_date,
        report_from: report_from,
        photo_url: photo_url,
        longitude: draggedLongitudeLatitude.lng,
        latitude: draggedLongitudeLatitude.lat
      })
    };

    // Send PUT request to DynamoDB
    customFetch(dragToEditUrl, requestOptions);
  }



  // Update location and description after users edit them in marker popup
  const updateTrashAndLocation = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      'Access-Control-Allow-Origin': 'request-originating server addresses',
      body: JSON.stringify({
        trash_name: trash, 
        location: address, 
        body: body, 
        report_date: report_date,
        report_from: report_from, // For dev, all non-coordinate data must be sent; e.g., if you don't send the data for "report_from", you are actually removing it from the database
        photo_url: photo_url // This will result in error when Datatable.js fetch data from the database
      })
    };
    
    const sendFetchRequest = () => {  
      // Send PUT request to DynamoDB
      customFetch(putOrPostUrl, requestOptions);
    }

    if (trash === "" || address === "") {
      alert("Trash name and location are required. Please fill out both input fields.")
    } else {
      console.log(JSON.stringify({
        trash_name: trash, 
        location: address, 
        body: e.target.id, 
        report_date: report_date,
        report_from: report_from,
        photo_url: photo_url
      }));
      return sendFetchRequest()
    }
    setShowEdit(false); 

  };

  return (
    <>
      <Marker
        latitude={latitude}
        longitude={longitude}
        id={body}
        draggable={true}
        onClick={handleMarkerClick}
        onDragEnd={recordDraggedMarker}
      />
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          offset={{ bottom: [0, -40] }}
          onClose={() => setShowPopup(false)}
        >
          {
          showEdit ? 
            <div>
              <input value={trash} placeholder={heading} onInput={(e) => setTrash(e.target.value)} />
              <input value={address} placeholder={location} onInput={(e) => setAddress(e.target.value)} />
              <button id={body} className="btn btn-dark btn-sm popupBtn" onClick={(e) => updateTrashAndLocation(e) }>Submit</button>
            </div>
            : 
            <div>
              <Heading level={6}>{heading}</Heading>
              <Text>Location: {location}</Text>
              <button className="btn btn-dark btn-sm popupBtn" onClick={() => setShowEdit(true) }>Edit</button>
            </div>
          }
        </Popup>
      )}
    </>
  );
}

const Map = () => {

  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";

  // Fetch data for geo coordinates when the component is mounted
  useEffect(() => {
    fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[])

  const geocode = (e) => {
    // Send PUT request to get geo coordinates
    let requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      'Access-Control-Allow-Origin': 'request-originating server addresses',
      body: JSON.stringify(e.value)
    };

    fetch(geocodeUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data;
        // setMarkerLocation({
        //   longitude: coordinates[0],
        //   latitude: coordinates[1],                 
        // });
        console.log(coordinates);
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Something went wrong! Please contact the administrator.")
      });
  }

  return (
    <>
      <MapView id="custom-map" initialViewState={{ latitude: 39.10282, longitude: -94.53513, zoom: 13 }}>
        <LocationSearch position="top-left" onChange={geocode} />
        {
          formData.map((element) => (
            element.latitude && element.longitude ? 
            <MarkerWithPopup 
              latitude={element.latitude} 
              longitude={element.longitude}
              heading={element.trash_name.charAt(0).toUpperCase() + element.trash_name.slice(1)} 
              location={element.location} 
              body={element.body}
              report_date={element.report_date}
              report_from={element.report_from}
              photo_url={element.photo_url}
              key={element.body} /> : ""
          )
        )}
      </MapView>
      <div id="response"></div>
    </>
  );
}

export default Map;