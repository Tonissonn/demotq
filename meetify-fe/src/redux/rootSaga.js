import { takeEvery } from "redux-saga/effects";
import { MEETING_LIST, ROOM_LIST } from "./constant";
import getMeetings from "./meetingSaga";
import getRooms from "./roomSaga";

export default function* rootSaga() {
  yield takeEvery(ROOM_LIST, getRooms);
  yield takeEvery(MEETING_LIST, getMeetings);
}
