import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import Home from "./Components/Home"
import { View } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import './Components/Nav.css';
import './App.css';

function App({ signOut }) {
  return (
    <Authenticator loginMechanisms={['email']} signUpAttributes={['name']} variation="modal">
      {({ signOut }) => (
        <View className="App">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                  <Link to="/" className="navbar-brand">Trash Tracker</Link>
                  <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                  >
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  
                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                      <ul className="navbar-nav position-absolute end-0">
                          {/* <li className="nav-item">
                            <button type="button" className="btn btn-outline-secondary">Print Map</button>
                          </li> */}
                          <li className="nav-item">
                            <button className="btn btn-outline-secondary" onClick={signOut}>Sign Out</button>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>

          <Home />
        </View>
      )}
    </Authenticator>
  );
}

export default App;
