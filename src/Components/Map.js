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

const MarkerWithPopup = ({ latitude, longitude, heading, location }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleMarkerClick = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
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
          <Heading level={6}>{heading}</Heading>
          {
          showEdit ? 
            <div>
              <Text>Location: {location}</Text>
              <button className="btn btn-dark btn-sm popupBtn" onClick={() => setShowEdit(true) }>Edit</button>
            </div>
            : 
            <div>
              <textarea placeholder={location}></textarea>
              <button className="btn btn-dark btn-sm popupBtn" onClick={() => setShowEdit(false) }>Submit</button>
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
      <MapView id="custom-map" initialViewState={{ latitude: 39.1002489, longitude: -94.5340805, zoom: 10 }}>
        <LocationSearch position="top-left" onChange={geocode} />
        {
          formData.map((element) => (
            element.latitude && element.longitude ? 
            <MarkerWithPopup 
              latitude={element.latitude} 
              longitude={element.longitude}
              heading={element.trash_name} 
              location={element.location} 
              key={element.body} /> : ""
          )
        )}
        <Marker latitude={latitude} longitude={longitude} />
      </MapView>
      <Button onClick={updateMarker}>Move Marker</Button>
      <div id="response"></div>
    </>
  );
}

export default MapWithMarkerPopup;