import React from 'react';
import Datafilter from './Datafilter';
import Datatable5 from './Datatable5';
import Footer from './Footer';
// import PrintMap from './PrintMap';
import Map from './Map';

const Home = () => {
    return (
        <div className="custom-container">
            <Map />
            <Datafilter />
            <Datatable5 />
            {/* <PrintMap /> */}
            <Footer />
        </div>
    );
}

export default Home;