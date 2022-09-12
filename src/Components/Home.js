import React from 'react';
import Datafilter from './Datafilter';
import Datatable5 from './Datatable5';
import DataEdit from './DataEdit';
import Footer from './Footer';
// import PrintMap from './PrintMap';
import Map from './Map';

const Home = () => {
    return (
        <div className="custom-container">
            <h2>Location Search</h2><br/>
            <Map />
            <br/><br/>
            <h2>Received Reports</h2><br/>
            {/* <Datafilter /> */}
            <Datatable5 />
            {/* <DataEdit /> */}
            {/* <PrintMap /> */}
            <Footer />
        </div>
    );
}

export default Home;