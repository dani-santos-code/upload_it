import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [bodyToPost, setbodyToPost] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  console.log(bodyToPost);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToPost),
    })
      .then((res) => res.json())
      .then(({ user, token }) => {
        setToken(token);
        setUser(user);
      });
  }, [bodyToPost]);

  return (
    <UserContext.Provider value={{ setbodyToPost, token, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
