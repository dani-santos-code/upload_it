import React from "react";
import styled from "styled-components";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import PhotoDetails from "./PhotoDetails";
import PrivateRoute from "./PrivateRoute";
import PublicGallery from "./PublicGallery";

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute path="/allImages">
          <PublicGallery />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/photos/:photoId">
          <PhotoDetails />
        </PrivateRoute>
      </Switch>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  min-height: 100vh;
`;

export default App;
