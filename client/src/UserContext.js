import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
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
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((e) => setLoginError(true));
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
      .then((res) => {
        if (res.status === 400) {
          setSignUpError(true);
        } else {
          return res.json();
        }
      })
      .then(({ user, token }) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/dashboard");
        history.go();
      })
      .catch((e) => {
        console.log(e);
        history.push("/");
      });
  };

  const handleLogOut = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };
    fetch("http://127.0.0.1:3000/api/v1/users/logout", requestOptions).then(
      (res) => {
        localStorage.clear();
        history.push("/");
        history.go();
      }
    );
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");
    setToken(localToken);
    setUser(JSON.parse(localUser));
  }, []);

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleSignUp,
        handleLogOut,
        loginError,
        signUpError,
        token,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
