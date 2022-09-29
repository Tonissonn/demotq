import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import Icon from "../../components/icon/icon";
import AddRoomModal from "../../components/modal/addRoomModal";
import Modal from "../../components/modal/modal";
import Table from "../../components/table/table";
import { roomsContext } from "../../hooks/roomsProvider";
import { userContext } from "../../hooks/userProvider";
import "./meetingRoom.scss";

const MeetingRoom = () => {
  const { rooms } = useContext(roomsContext);
  const { user } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomListFiltered, setRoomListFiltered] = useState<
    RoomDTO[] | undefined
  >([]);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [modalRoomName, setModalRoomName] = useState("");
  const [modalRoomId, setModalRoomId] = useState("");
  const [filterByStatusList, setFilterByStatusList] = useState<
    string[] | undefined
  >([]);
  const [filterByCapacityList, setFilterByCapacityList] = useState<
    string[] | undefined
  >([]);
  const [filterByPopularityList, setFilterByPopularityList] = useState<
    string[] | undefined
  >([]);

  const [filterConditionList, setFilterConditionList] = useState({
    status: "",
    capacity: "",
    popularity: "",
  });

  function closeModal() {
    setIsModalOpen(false);
  }
  function closeAddRoomModal() {
    setIsAddRoomModalOpen(false);
  }

  useEffect(() => {
    setFilterByStatusList(
      rooms
        ?.map((room: RoomDTO) => {
          return room.currentStatus;
        })
        .filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        })
    );
    setFilterByPopularityList(
      rooms
        ?.map((room: RoomDTO) => {
          return room.futureMeetings + "";
        })
        .filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        })
    );
    setFilterByCapacityList(
      rooms
        ?.map((room: RoomDTO) => {
          return room.capacity + "";
        })
        .filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        })
    );
    setRoomListFiltered(rooms);
  }, [rooms]);

  const handleChangeFilters = (event: React.SyntheticEvent<EventTarget>) => {
    setFilterConditionList({
      ...filterConditionList,
      [(event?.target as HTMLInputElement).name]: (
        event?.target as HTMLInputElement
      ).value,
    });
  };

  useEffect(() => {
    setRoomListFiltered(
      rooms?.filter((room) => {
        return (
          (filterConditionList.status !== ""
            ? room.currentStatus === filterConditionList.status
            : true) &&
          (filterConditionList.capacity !== ""
            ? room.capacity + "" === filterConditionList.capacity
            : true) &&
          (filterConditionList.popularity !== ""
            ? room.futureMeetings + "" === filterConditionList.popularity
            : true)
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterConditionList]);

  return (
    <div className="meeting-room">
      <h1>Meeting Rooms</h1>
      <p>Enter on ameeting room to see its calendar view of the events.</p>
      <div className="filter-bar">
        <span>
          <select onChange={handleChangeFilters} name="status" id="">
            <option value="">Filter by current status</option>
            {filterByStatusList?.map((status: string) => {
              return <option value={status}>{status}</option>;
            })}
          </select>
        </span>
        <span>
          <select onChange={handleChangeFilters} name="capacity" id="">
            <option value="">Filter by capacity</option>
            {filterByCapacityList?.map((capacity: string) => {
              return <option value={capacity}>{capacity}</option>;
            })}
          </select>
        </span>
        <span>
          <select onChange={handleChangeFilters} name="popularity" id="">
            <option value="">Filter by popularity</option>
            {filterByPopularityList?.map((popularity: string) => {
              return <option value={popularity}>{popularity}</option>;
            })}
          </select>
        </span>
        <span className="button-create">
          {user?.role === "admin" ? (
            <Button
              name={"ADD MEETING ROOM"}
              variant="secondary"
              onClick={() => {
                setIsAddRoomModalOpen(true);
              }}
            />
          ) : (
            <></>
          )}
        </span>
      </div>
      <p></p>
      <div className="table">
        <Table
          headers={
            user?.role === "admin"
              ? [
                  "Name",
                  "Current Status",
                  "Capacity",
                  "Active appointments",
                  " ",
                  " ",
                ]
              : [
                  "Name",
                  "Current Status",
                  "Capacity",
                  "Active appointments",
                  " ",
                ]
          }
          items={roomListFiltered}
          keys={
            user?.role === "admin"
              ? [
                  "name",
                  "currentStatus",
                  "capacity",
                  "futureMeetings",
                  "buttons",
                  "action",
                ]
              : [
                  "name",
                  "currentStatus",
                  "capacity",
                  "futureMeetings",
                  "action",
                ]
          }
          keyRenderer={{
            action: (room: RoomDTO) => (
              <Button
                name={"Schedule a meeting"}
                variant={"secondary"}
                onClick={() => {
                  setIsModalOpen(true);
                  setModalRoomName(room.name);
                  setModalRoomId(room._id);
                }}
              />
            ),
            buttons: (room: RoomDTO) => (
              <>
                <Icon type={"edit"} />
                <Icon type={"delete"} />
              </>
            ),
          }}
        />
      </div>
      {isModalOpen ? (
        <Modal
          onExit={closeModal}
          roomName={modalRoomName}
          roomId={modalRoomId}
        />
      ) : null}
      {isAddRoomModalOpen ? <AddRoomModal onExit={closeAddRoomModal} /> : null}
    </div>
  );
};
export default MeetingRoom;
