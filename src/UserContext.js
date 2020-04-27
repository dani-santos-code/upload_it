import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Router } from "react-router-dom";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  let history = useHistory();

  const handleLogin = ({ email, password }) => {
    fetch("http://127.0.0.1:3000/api/v1/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(({ user, token }) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
      });
  };

  const handleSignUp = ({ name, email, password }) => {
    fetch("http://127.0.0.1:3000/api/v1/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then(({ user, token }) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        history.push("/dashboard");
        history.go();
      })
      .catch((e) => {
        console.log(e);
        history.push("/signup");
      });
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  return (
    <UserContext.Provider value={{ handleLogin, handleSignUp, token, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
