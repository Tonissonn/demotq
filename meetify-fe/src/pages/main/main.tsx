import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../components/header/header";
import ProtectedRoute from "../../components/protectedRoutes/protectedRoutes";
import { MeetingsProvider } from "../../hooks/meetingsProvider";
import { RoomsProvider } from "../../hooks/roomsProvider";
import { userContext } from "../../hooks/userProvider";
import { UsersProvider } from "../../hooks/usersProvider";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Dashboard from "../dashboard/dashboard";
import MeetingRoom from "../meetingRoom/meetingRoom";
import Schedule from "../schedule/schedule";

const Main = () => {
  const { user } = useContext(userContext);

  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route
            path="schedule"
            element={
              <UsersProvider>
                <MeetingsProvider>
                  <RoomsProvider>
                    <Schedule />
                  </RoomsProvider>
                </MeetingsProvider>
              </UsersProvider>
            }
          />
          <Route
            path="meetingRoom"
            element={
              <UsersProvider>
                <RoomsProvider>
                  <MeetingRoom />
                </RoomsProvider>
              </UsersProvider>
            }
          />
          <Route
            path="dashboard"
            element={
              <UsersProvider>
                <MeetingsProvider>
                  <RoomsProvider>
                    <Dashboard />
                  </RoomsProvider>
                </MeetingsProvider>
              </UsersProvider>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default Main;
