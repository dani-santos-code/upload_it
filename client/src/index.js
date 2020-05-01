import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "./UserContext";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
