import React from "react";
import { MapView, LocationSearch } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Map.css';

const Map = () => {
  return <MapView id="custom-map" initialViewState={{
        latitude: 39.1002489,
        longitude: -94.5340805,
        zoom: 14,
    }}>
        <LocationSearch position="top-left"/>
    </MapView>
};

export default Map;

// import { createMap } from "maplibre-gl-js-amplify";
// import "maplibre-gl/dist/maplibre-gl.css";
// import { drawPoints } from "maplibre-gl-js-amplify";

// async function initializeMap() {
//     const map = await createMap({
//         container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
//         center: [-123.1187, 49.2819], // [Longitude, Latitude]
//         zoom: 11,
//     })
// }

// initializeMap();

// export default ...

// map.on("load", function () {
//     drawPoints("mySourceName", // Arbitrary source name
//         [
//             {
//               coordinates: [-122.483696, 37.833818], // [Longitude, Latitude]
//               title: "Golden Gate Bridge",
//               address: "A suspension bridge spanning the Golden Gate",
//             },
//             {
//               coordinates: [- 122.4770, 37.8105], // [Longitude, Latitude]
//             },
//         ], // An array of coordinate data, an array of Feature data, or an array of [NamedLocations](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/src/types.ts#L8)
//         map,
//         {
//             showCluster: true,
//             unclusteredOptions: {
//                 showMarkerPopup: true,
//             },
//             clusterOptions: {
//                 showCount: true,
//             },
//         }
//     );
// });