import axios from "axios";
import { useContext, useState } from "react";
import { roomsContext } from "../../hooks/roomsProvider";
import Button from "../button/button";
import "./addRoomModal.scss";
interface ModalComponent {
  onExit?: () => void;
  closeModal?: Function;
  footer?: JSX.Element[];
}

const AddRoomModal: React.FC<ModalComponent> = ({ onExit }): JSX.Element => {
  const { loadRooms } = useContext(roomsContext);

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
  });
  const btnCancel = "CANCEL";
  const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    try {
      const jwtToken = localStorage.getItem("access-token");
      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` },
      };
      const bodyParameters = {
        name: formData.name,
        capacity: Number(formData.capacity),
        futureMeetings: 15,
        currentStatus: "Free",
      };
      console.log(bodyParameters);
      await axios.post("http://localhost:3001/room/", bodyParameters, config);
      loadRooms();
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

  return (
    <div className="modal-background" onClick={onExit}>
      <div
        className="add-room-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div id="modal-container">
          <h3>Add New Room</h3>

          <form id="modal-form" name="form">
            <label id="left">
              Name
              <input
                name="name"
                onChange={handleChange}
                className="input-text"
                placeholder="Enter Name"
              />
            </label>
            <label id="right">
              Capacity
              <input
                name="capacity"
                onChange={handleChange}
                className="input-text"
                placeholder="Enter Capacity (number)"
              />
            </label>
          </form>
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

export default AddRoomModal;
