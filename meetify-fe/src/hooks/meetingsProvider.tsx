import axios from "axios";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { userContext } from "./userProvider";

interface MeetingsContextType {
  meetings?: MeetingDTO[];
  loadMeetings: () => void;
}

export const meetingsContext = React.createContext<MeetingsContextType>({
  loadMeetings: function () {},
});

export const MeetingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [meetings, setMeetings] = useState<MeetingDTO[] | undefined>(undefined);
  const { logout } = useContext(userContext);

  function loadMeetings() {
    const fetchMeetings = async () => {
      try {
        const jwtToken = localStorage.getItem("access-token");
        const config = {
          headers: { Authorization: `Bearer ${jwtToken}` },
        };
        const { data } = await axios.get<MeetingDTO[]>(
          "http://localhost:3001/meeting",
          config
        );
        setMeetings(data);
      } catch (error) {
        logout();
      }
    };
    fetchMeetings();
  }

  useEffect(() => {
    loadMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <meetingsContext.Provider value={{ meetings, loadMeetings }}>
        {children}
      </meetingsContext.Provider>
    </>
  );
};
