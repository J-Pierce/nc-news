import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userLogin;
  if (sessionStorage.getItem("user")) {
    userLogin = JSON.parse(sessionStorage.getItem("user"));
  } else {
    userLogin = {};
  }

  const [user, setUser] = useState(userLogin);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
