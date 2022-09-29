import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useState } from "react";
import { meetingsContext } from "../../hooks/meetingsProvider";
import { usersContext } from "../../hooks/usersProvider";
import Button from "../button/button";
import Icon from "../icon/icon";
import "./modal.scss";
interface ModalComponent {
  onExit?: () => void;
  roomName?: string;
  roomId?: string;
  closeModal?: Function;
  footer?: JSX.Element[];
}

const Modal: React.FC<ModalComponent> = ({
  roomName,
  roomId,
  onExit,
}): JSX.Element => {
  const { users } = useContext(usersContext);
  const { loadMeetings } = useContext(meetingsContext);
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [formData, setFormData] = useState({
    roomName: roomName,
    subject: "",
    startDate: "",
    startHour: "",
    endHour: "",
  });
  const btnCancel = "CANCEL";
  const timeRange = Array.from(Array(24).keys())
    .map((hour) => {
      return [hour + ":00", hour + ":15", hour + ":30", hour + ":45"];
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    });

  const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    const participants = selectedUsers.map((participantEmail) => {
      return users?.find((user) => {
        return user.email === participantEmail;
      })?._id;
    });
    const filteredParticipants = participants.filter((participantID) => {
      if (participantID) return participantID;
      else {
        return undefined;
      }
    });

    const startDate = new Date(formData.startDate);
    startDate.setHours(
      Number(formData.startHour.split(":")[0]),
      Number(formData.startHour.split(":")[1])
    );
    const endDate = new Date(formData.startDate);
    endDate.setHours(
      Number(formData.endHour.split(":")[0]),
      Number(formData.endHour.split(":")[1])
    );

    try {
      const jwtToken = localStorage.getItem("access-token");
      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
      };
      const userToken: UserDTO | undefined =
        jwtToken != null ? jwt_decode(jwtToken) : undefined;
      const bodyParameters = {
        name: formData.subject,
        ownerId: userToken?._id,
        roomId: roomId,
        participantsId: filteredParticipants,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      await axios.post(
        "http://localhost:3001/meeting/",
        bodyParameters,
        config
      );
      loadMeetings();
    } catch (err) {}
  };

  const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [(event?.target as HTMLInputElement).name]: (
        event?.target as HTMLInputElement
      ).value,
    });
  };
  const handleUsersOnChange = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      setSelectedUsers([...selectedUsers, currentUser]);
      setCurrentUser("");
    } else {
      setCurrentUser((event.target as HTMLInputElement).value);
    }
  };
  const handleUserOnDelete = (eventUser: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== eventUser));
  };

  return (
    <div className="modal-background" onClick={onExit}>
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div id="modal-container">
          <div id="left">
            <form id="modal-form" name="form">
              <h3>{roomName}</h3>
              <h4>Name/Subject</h4>
              <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                required
                onChange={handleChange}
              />
              <h4 className="time-picker">
                Pick Time&nbsp;
                <Icon type={"info"} />
              </h4>
              <input
                type="date"
                id="start"
                name="startDate"
                onChange={handleChange}
              />
              &nbsp;&nbsp;
              <select
                className="select-hour"
                name="startHour"
                onChange={handleChange}
              >
                {timeRange.map((hours) => {
                  return (
                    <option key={hours} className="select-option" value={hours}>
                      {hours}
                    </option>
                  );
                })}
              </select>
              &nbsp; to&nbsp;&nbsp;
              <select
                className="select-hour"
                name="endHour"
                onChange={handleChange}
              >
                {timeRange.map((hours) => {
                  return (
                    <option key={hours} className="select-option" value={hours}>
                      {hours}
                    </option>
                  );
                })}
              </select>
              <h4>Add Members</h4>
              <input
                type="text"
                placeholder="Enter email"
                onKeyUp={handleUsersOnChange}
              />
              <div className="list-of-chips">
                {selectedUsers.map((user: string) => {
                  return (
                    <div className="tag-item" key={user}>
                      {user}
                      <button
                        type="button"
                        className="button"
                        onClick={() => handleUserOnDelete(user)}
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
          <div id="right">
            <button id="x-btn" onClick={onExit}>
              X
            </button>
          </div>
        </div>
        <div id="footer">
          <div id="cancel-btn">
            <Button
              variant="secondary"
              name={btnCancel}
              onClick={onExit}
            ></Button>
          </div>
          <div id="save-btn">
            <form id="modal-form" name="form" onSubmit={handleSubmit}>
              <div>
                <Button variant={"primary"} name="SAVE" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
