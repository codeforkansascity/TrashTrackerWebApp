import React from "react";
import './Map.css';

class Map extends React.PureComponent {
    render() {
        return (
            <section id="map">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-8">
                            <div class="mapouter">
                                <div class="gmap_canvas">
                                    <iframe width="700" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=kansas%20city,%20mo&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                    <a href="https://fmovies-online.net">fmovies</a><br />
                                    <a href="https://www.embedgooglemap.net">google maps embed code generator</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
}}

export default Map;