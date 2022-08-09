import React from 'react';
import ReactToPrint from 'react-to-print';

import Map from './Map';

class PrintMap extends React.PureComponent {
  render() {
    return (
      <div>
        <Map ref={el => (this.componentRef = el)} /><br/>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <button className="btn btn-outline-secondary">Print Map</button>;
          }}
          content={() => this.componentRef}
        /><br/><br/><br/>
      </div>
    );
  }
};

export default PrintMap;