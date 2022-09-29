import axios from "axios";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { userContext } from "./userProvider";

interface RoomsContextType {
  rooms?: RoomDTO[];
  loadRooms: () => void;
}

export const roomsContext = React.createContext<RoomsContextType>({
  loadRooms: function () {},
});

export const RoomsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomDTO[] | undefined>(undefined);
  const { logout } = useContext(userContext);

  function loadRooms() {
    const fetchRooms = async () => {
      try {
        const jwtToken = localStorage.getItem("access-token");
        const config = {
          headers: { Authorization: `Bearer ${jwtToken}` },
        };
        const { data } = await axios.get<RoomDTO[]>(
          "http://localhost:3001/room",
          config
        );
        setRooms(data);
      } catch (error: any) {
        if (error.response.status === 401) {
          logout();
        }
      }
    };
    fetchRooms();
  }

  useEffect(() => {
    loadRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <roomsContext.Provider value={{ rooms, loadRooms }}>
        {children}
      </roomsContext.Provider>
    </>
  );
};
