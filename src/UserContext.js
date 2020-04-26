import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  return (
    <UserContext.Provider value={{ handleLogin, token, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
