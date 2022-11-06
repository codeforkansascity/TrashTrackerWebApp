import { React, useState} from "react";
import { MapView, LocationSearch, Heading, Text, Button } from "@aws-amplify/ui-react";
import { Marker, Popup } from 'react-map-gl';
import "@aws-amplify/ui-react/styles.css";
import "./Map.css";

// Map Display Style:
// Streets style looks a bit dull;
// Imagery style doesn't have street name - it's like satellite view;
// Currently using Navigation style;
// Haven't tried other style

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

  const updateMarker = () => setMarkerLocation({ latitude: latitude + 0.03, longitude: longitude + 0.05 });

  return (
    <>
      <MapView id="custom-map" initialViewState={{ latitude: 39.1002489, longitude: -94.5340805, zoom: 10 }}>
        <LocationSearch position="top-left" />
        <Marker latitude={latitude} longitude={longitude} />
        <MarkerWithPopup latitude={39.1002489} longitude={-94.5340805} heading={"Fridge"} location={"Loose Park"} />
        <MarkerWithPopup latitude={39.1302489} longitude={-94.4940805} heading={"Mattress"} location={"8th and main st"} />
      </MapView>
      <Button onClick={updateMarker}>Move Marker</Button>
    </>
  );
}
