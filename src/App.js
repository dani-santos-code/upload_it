import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default App;
