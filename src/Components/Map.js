import React from "react";
import { MapView, LocationSearch } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

export default function Map() {
  return <MapView initialViewState={{
        latitude: 39.1002489,
        longitude: -94.5340805,
        zoom: 14,
    }}>
        <LocationSearch position="top-left"/>
    </MapView>
}
