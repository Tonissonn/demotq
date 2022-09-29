import { combineReducers } from "redux";
import { meetingData } from "./meetingReducer";
import { meetingListData } from "./reducer";
import { roomData } from "./roomReducer";
export default combineReducers({
  meetingListData,
  meetingData,
  roomData,
});
