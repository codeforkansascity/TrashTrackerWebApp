import React from 'react';
import Datafilter from './Datafilter';
import Datatable2 from './Datatable2';
import Footer from './Footer';
import PrintMap from './PrintMap';

const Home = () => {
    return (
        <div className="custom-container">
            <PrintMap />
            <Datafilter />
            <Datatable2 />
            <Footer />
        </div>
    );
}

export default Home;