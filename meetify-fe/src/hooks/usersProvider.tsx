import axios from "axios";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { userContext } from "./userProvider";

interface UsersContextType {
  users?: UserDTO[];
  loadUsers: () => void;
}

export const usersContext = React.createContext<UsersContextType>({
  loadUsers: function () {},
});

export const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<UserDTO[] | undefined>(undefined);
  const { logout } = useContext(userContext);

  function loadUsers() {
    const fetchUsers = async () => {
      try {
        const jwtToken = localStorage.getItem("access-token");
        const config = {
          headers: { Authorization: `Bearer ${jwtToken}` },
        };
        const { data } = await axios.get<UserDTO[]>(
          "http://localhost:3001/user",
          config
        );
        setUsers(data);
      } catch (error) {
        logout();
      }
    };
    fetchUsers();
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <usersContext.Provider value={{ users, loadUsers }}>
        {children}
      </usersContext.Provider>
    </>
  );
};
