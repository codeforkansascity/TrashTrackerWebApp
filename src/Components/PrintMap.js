// This file does not work. 
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import Map from './Map';

const PrintMap = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="btn btn-outline-secondary">Print Map</button>}
        content={() => componentRef.current}
      />
      <Map ref={componentRef} />
    </div>
  );
};

export default PrintMap;