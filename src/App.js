import { Authenticator } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import Home from "./Components/Home";
import { View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dropdown from "react-bootstrap/Dropdown";

function App({ signOut }) {
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

          <Home />
        </View>
      )}
    </Authenticator>
  );
}

export default App;
