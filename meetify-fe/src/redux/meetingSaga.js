import { put } from "redux-saga/effects";
import { SET_MEETING_LIST } from "./constant";

export default function* getMeetings() {
  const jwtToken = localStorage.getItem("access-token");
  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };
  let data = yield fetch("http://localhost:3001/meeting", config);
  data = yield data.json();
  yield put({ type: SET_MEETING_LIST, data });
}
