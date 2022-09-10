import React from 'react';
import Datafilter from './Datafilter';
import Datatable5 from './Datatable5';
import Footer from './Footer';
import PrintMap from './PrintMap';

const Home = () => {
    return (
        <div className="custom-container">
            <Datafilter />
            <Datatable5 />
            <PrintMap />
            <Footer />
        </div>
    );
}

export default Home;