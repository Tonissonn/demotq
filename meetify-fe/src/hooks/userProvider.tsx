import jwt_decode from "jwt-decode";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface UserContextType {
  user?: UserDTO;
  token?: string;
  setTokenUser: (token: string, user: UserDTO) => void;
  logout: () => void;
}

export const userContext = React.createContext<UserContextType>({
  setTokenUser: function (token: string, user: UserDTO) {},
  logout: function () {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserDTO | undefined>(undefined);

  function setTokenUser(token: string, user: UserDTO) {
    setToken(token);
    setUser(user);
    localStorage.setItem("access-token", token);
  }

  function logout() {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem("access-token");
  }

  useEffect(() => {
    const loadData = localStorage.getItem("access-token");

    return setUser(loadData != null ? jwt_decode(loadData) : undefined);
  }, []);

  return (
    <>
      <userContext.Provider value={{ user, token, setTokenUser, logout }}>
        {children}
      </userContext.Provider>
    </>
  );
};
