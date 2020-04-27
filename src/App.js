import React from "react";
import styled from "styled-components";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";

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
        <PrivateRoute path="/dashboard">
          <Dashboard />
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