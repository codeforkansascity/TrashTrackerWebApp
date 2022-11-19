import { React, useState, useEffect } from "react";
import { MapView, LocationSearch, Heading, Text, Button } from "@aws-amplify/ui-react";
import { Marker, Popup } from 'react-map-gl';
import "@aws-amplify/ui-react/styles.css";
import "./Map.css";

// Map Display Style:
// Streets style looks a bit dull;
// Imagery style doesn't have street name - it's like satellite view;
// Currently using Navigation style;
// Previews are available on Amazon Location Services console

// Reference: https://ui.docs.amplify.aws/react/connected-components/geo
// See the section on Usage with react-map-gl

const MarkerWithPopup = ({ latitude, longitude, heading, location, body, report_date, report_from, photo_url }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [trash, setTrash] = useState("");
  const [address, setAddress] = useState("");

  const handleMarkerClick = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
  };

  // Add function that update formData and send PUT request to the database
  const updateTrashAndLocation = (e) => {
    e.preventDefault();
    const sendFetchRequest = () => {
      const putOrPostUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio";
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        'Access-Control-Allow-Origin': 'request-originating server addresses',
        body: JSON.stringify({
          trash_name: trash, 
          location: address, 
          body: e.target.id, 
          report_date: report_date,
          report_from: report_from,
          photo_url: photo_url
        })
      };
  
      // Send PUT request to DynamoDB
      fetch(putOrPostUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          alert("Success! Please refresh the page to view your changes.")
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Something went wrong! Please contact the administrator.")
        });
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
        onClick={handleMarkerClick}
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

const MapWithMarkerPopup = () => {

  const [formData, setFormData] = useState([]); 

  const getUrl = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";

  // Fetch data for geo coordinates when the component is mounted
  useEffect(() => {
    fetch(getUrl)
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[])

  const [{ latitude, longitude }, setMarkerLocation] = useState({
    latitude: 39.1002489,
    longitude: -94.4940805,
  });

  const geocode = (e) => {
    console.log("testing......." + e.value);
    // Send PUT request to get geo coordinates
    let requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      'Access-Control-Allow-Origin': 'request-originating server addresses',
      body: JSON.stringify(e.value)
    };

    fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/geocode", requestOptions)
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

  const updateMarker = () => setMarkerLocation({ latitude: latitude + 0.03, longitude: longitude + 0.05 });

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
        {/* <Marker latitude={latitude} longitude={longitude} /> */}
      </MapView>
      {/* <Button onClick={updateMarker}>Move Marker</Button> */}
      <div id="response"></div>
    </>
  );
}

export default MapWithMarkerPopup;