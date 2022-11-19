import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { View } from "@aws-amplify/ui-react";
import Dropdown from "react-bootstrap/Dropdown";
import './Nav.css';

function Nav() {
  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["name"]}
      variation="modal"
    >
      {({ signOut }) => (
        <View className="App">
          
          <Dropdown>
            <div className="navbar-container">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                  <Link to="/" className="navbar-brand">Trash Tracker</Link>
                  <Dropdown.Toggle id="dropdown-basic">
                    User Menu
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="#/action-1">Add User</Dropdown.Item>

                    <Dropdown.Item href="#/action-2">
                      Update Email
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Change Password
                    </Dropdown.Item> */}

                    <Dropdown.Item href="#" onClick={signOut}>
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </nav>
            </div>
          </Dropdown>
        </View>
      )}
    </Authenticator>
  );
}

export default Nav;



