import moment from "moment";
import { useContext } from "react";
import MeetingCard from "../../components/card/meetingCard";
import { meetingsContext } from "../../hooks/meetingsProvider";
import { roomsContext } from "../../hooks/roomsProvider";
import { userContext } from "../../hooks/userProvider";
import "../../index";
import "./schedule.scss";

const Schedule = () => {
  const { meetings } = useContext(meetingsContext);
  const { rooms } = useContext(roomsContext);
  const { user } = useContext(userContext);

  return (
    <div className="schedule-container">
      <div className="future-meetings">
        <h1>Your Future Meetings</h1>
        <div className="future-list">
          {meetings
            ?.filter(
              (item) =>
                moment(item.endDate).utc().fromNow().split(" ")[0] === "in"
            )
            .map((item, index) => {
              const timeInterval = moment
                .duration(
                  moment(item.endDate).utc().diff(moment(item.startDate).utc())
                )
                .asHours();
              const roomName = rooms?.find((room) => {
                return room._id === item.roomId;
              })?.name;
              return (
                <MeetingCard
                  key={index}
                  title={item.name}
                  meetingRoom={roomName ? roomName : ""}
                  date={moment(item.startDate).utc().format("YYYY/MM/DD hh:mm")}
                  participants={item.participantsId.length + ""}
                  duration={timeInterval + ""}
                  isPassed={false}
                  isOwner={user?._id === item.ownerId ? true : false}
                />
              );
            })}
        </div>
      </div>
      <div className="past-meetings">
        <h1>Your Past Meetings</h1>
        <div className="past-list">
          {meetings
            ?.filter(
              (item) =>
                moment(item.endDate).utc().fromNow().split(" ")[0] !== "in"
            )
            .map((item, index) => {
              const timeInterval = moment
                .duration(
                  moment(item.endDate).utc().diff(moment(item.startDate).utc())
                )
                .asHours();
              const roomName = rooms?.find((room) => {
                return room._id === item.roomId;
              })?.name;
              return (
                <MeetingCard
                  key={index}
                  title={item.name}
                  meetingRoom={roomName ? roomName : ""}
                  date={moment(item.startDate).utc().format("YYYY/MM/DD hh:mm")}
                  participants={item.participantsId.length + ""}
                  duration={timeInterval + ""}
                  isPassed={true}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Schedule;
