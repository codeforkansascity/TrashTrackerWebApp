import React from "react";
import { MapView, LocationSearch } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./Map.css";

// Map Display Style:
// Streets style looks a bit dull;
// Imagery style doesn't have street name - it's like satellite view;
// Currently using Navigation style;
// Haven't tried other style

const Map = () => {
  return (
    <MapView
      id="custom-map"
      initialViewState={{
        latitude: 39.1002489,
        longitude: -94.5340805,
        zoom: 14,
      }}
    >
      <LocationSearch position="top-left" />
    </MapView>
  );
};

export default Map;

// Reference: https://aws.amazon.com/blogs/mobile/add-maps-to-your-app-in-3-steps-with-aws-amplify-geo/
// Reference: https://docs.amplify.aws/lib/geo/maps/q/platform/js/#display-a-map
// Configuration for below not completed; DO NOT USE

// import { createMap } from "maplibre-gl-js-amplify";
// import "maplibre-gl/dist/maplibre-gl.css";

// import { useEffect } from 'react';
// import { drawPoints } from "maplibre-gl-js-amplify";
// import './Map.css';
// import "maplibre-gl-js-amplify/dist/public/amplify-map.css";

// async function initializeMap() {
//     const map = await createMap({
//         container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
//         center: [-123.1187, 49.2819], // [Longitude, Latitude]
//         zoom: 11,
//     });
//     return map;
// }

// initializeMap();

// export default function Map() {
//     useEffect( async () => {
//        const map = await initializeMap();
//      }, []);
//      return (
//        <div>
//          <div id="map"></div>
//        </div>
//      );
//    }

// // map.on("load", function () {
// //     drawPoints("mySourceName", // Arbitrary source name
// //         [
// //             {
// //               coordinates: [-122.483696, 37.833818], // [Longitude, Latitude]
// //               title: "Golden Gate Bridge",
// //               address: "A suspension bridge spanning the Golden Gate",
// //             },
// //             {
// //               coordinates: [- 122.4770, 37.8105], // [Longitude, Latitude]
// //             },
// //         ], // An array of coordinate data, an array of Feature data, or an array of [NamedLocations](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/src/types.ts#L8)
// //         map,
// //         {
// //             showCluster: true,
// //             unclusteredOptions: {
// //                 showMarkerPopup: true,
// //             },
// //             clusterOptions: {
// //                 showCount: true,
// //             },
// //         }
// //     );
// // });
