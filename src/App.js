import { React } from 'react';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Nav from "./Components/Nav";
import Home from "./Components/Home";

const App = () => {
  // Make sure the useAuthenticator hook is only reevaluated when `user` changes; otherwise, it will rerender whenever a state changes 
  const { user } = useAuthenticator((context) => [context.user]); 

  // Make sure the Home component is not rendered when users sign out; otherwise, signout btn doesn't work properly
  const { authStatus } = useAuthenticator(context => [context.authStatus]); 

  return (
    <View className="App">
      <Nav />
      { authStatus !== 'authenticated' ? "" : <Home /> } 
    </View>
  );
}

const AppWithAuthentication = () => (
  <Authenticator.Provider>
    <App />
  </Authenticator.Provider>
);

export default AppWithAuthentication;