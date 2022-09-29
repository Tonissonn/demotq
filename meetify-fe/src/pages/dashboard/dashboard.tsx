import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SecondaryCard from "../../components/card/secondaryCard";
import Modal from "../../components/modal/modal";
import { userContext } from "../../hooks/userProvider";
import { usersContext } from "../../hooks/usersProvider";
import "../../index";
import { meetingList } from "../../redux/meetingAction";
import { roomList } from "../../redux/roomAction";
import "./dashboard.scss";

const Dashboard = () => {
  const { users } = useContext(usersContext);
  const { user } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomName, setModalRoomName] = useState("");
  const [modalRoomId, setModalRoomId] = useState("");

  const dispatch = useDispatch();
  let meetingData = useSelector((state: any) => state.meetingData);
  let roomData = useSelector((state: any) => state.roomData);

  function openModal() {
    setIsModalOpen(true);
  }
  function exitModal() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    dispatch(meetingList());
    dispatch(roomList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //ah baiatule, nici mouse-ul nu te ajuta, de aia esti asa in urma. - Ioooaaana
  return (
    <div className="dashboard-container">
      {isModalOpen ? (
        <Modal
          onExit={exitModal}
          roomName={modalRoomName}
          roomId={modalRoomId}
        />
      ) : null}
      <div className="subheader-container">
        <h1>Welcome back!</h1>
        <h4>
          Control your schedule, be flexible and appoint new meeting rooms with
          your co-workers whenever you need.
        </h4>
      </div>
      <div className="room-cards-container">
        <h1>SCHEDULE A MEETING ROOM</h1>
        {roomData?.map((item: RoomDTO, index: string) => (
          <SecondaryCard
            key={index}
            title={item.name}
            status={item.currentStatus}
            capacity={item.capacity}
            futureMeetings={
              item.futureMeetings !== 0
                ? item.futureMeetings + " future meetings"
                : "No meetings"
            }
            onClick={() => {
              setIsModalOpen(true);
              setModalRoomName(item.name);
              setModalRoomId(item._id);
            }}
          />
        ))}
      </div>
      <div className="buttons-container">
        <div className="buttons-grid">
          <h2>LAST UPDATES</h2>
          <span className="schedule-button">
            <Button
              variant="secondary"
              name="SCHEDULE A MEETING "
              onClick={openModal}
            />
          </span>
        </div>
      </div>
      <div className="meeting-cards-container">
        {meetingData?.map((item: MeetingDTO) => {
          const timeInterval = moment
            .duration(
              moment(item.endDate).utc().diff(moment(item.startDate).utc())
            )
            .asHours();
          const userOwner = users?.find((user) => {
            return user._id === item.ownerId;
          })?.name;
          return (
            <Card
              isAdmin={user?.role === "admin" ? true : false}
              key={item._id}
              title={item.name}
              appointedFor={moment(item.startDate)
                .utc()
                .format("YYYY MMM DD hh:mm a")}
              appointedBy={userOwner ? userOwner : ""}
              participants={item.participantsId.length.toString()}
              duration={
                timeInterval === 1
                  ? timeInterval + " hour"
                  : timeInterval + " hours"
              }
            />
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;
