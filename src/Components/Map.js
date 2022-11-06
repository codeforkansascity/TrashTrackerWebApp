import { React, useState} from "react";
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

function MarkerWithPopup({ latitude, longitude, heading, location }) {
  const [showPopup, setShowPopup] = useState(false);

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
          <Text>Location: {location}</Text>
        </Popup>
      )}
    </>
  );
}

export default function MapWithMarkerPopup() {
  const [{ latitude, longitude }, setMarkerLocation] = useState({
    latitude: 39.1002489,
    longitude: -94.4940805,
  });

  // Below doesn't seem to work on the front-end. But it worked on the back-end. See app.js in Lambda function
  
  // const AWS = require('aws-sdk');
  // let location = new AWS.Location();

  const geocode = (e) => {
    console.log("testing.......");
    let params = {
      "IndexName": "trashLocationSearch-staging",
      "Text": "Kansas City, MO",
      "BiasPosition": [-94.58316695554774,39.103642515847355], //[longitude, latitude]
      "MaxResults": "5"
    };

    // location.searchPlaceIndexForText(params, function(err, data) {
    //   if (err) {
    //     alert("Something went wrong. Please contact Code for KC.");
    //     document.querySelector("#response").textContent = JSON.stringify(err, undefined, 2);
    //   } else {
    //     document.querySelector("#response").textContent = JSON.stringify(data, undefined, 2);

    //     const coordinates = data.Results[0].Place.Geometry.Point;
    //     setMarkerLocation({
    //       longitude: coordinates[0],
    //       latitude: coordinates[1],                 
    //     });
    //     console.log(coordinates);
    //     return coordinates
    //   }
    // })
  }

  const updateMarker = () => setMarkerLocation({ latitude: latitude + 0.03, longitude: longitude + 0.05 });

  return (
    <>
      <MapView id="custom-map" initialViewState={{ latitude: 39.1002489, longitude: -94.5340805, zoom: 10 }} onClick={() => geocode()}>
        <LocationSearch position="top-left" />
        <Marker latitude={latitude} longitude={longitude} />
        <MarkerWithPopup latitude={39.1002489} longitude={-94.5340805} heading={"Fridge"} location={"Loose Park"} />
        <MarkerWithPopup latitude={39.1302489} longitude={-94.4940805} heading={"Mattress"} location={"8th and main st"} />
      </MapView>
      <Button onClick={updateMarker}>Move Marker</Button>
      <div id="response"></div>
    </>
  );
}
