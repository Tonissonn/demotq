import { put } from "redux-saga/effects";
import { SET_ROOM_LIST } from "./constant";

export default function* getRooms() {
  const jwtToken = localStorage.getItem("access-token");
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  let data = yield fetch("http://localhost:3001/room", config);
  data = yield data.json();
  yield put({ type: SET_ROOM_LIST, data });
}
