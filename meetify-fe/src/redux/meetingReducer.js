import { SET_MEETING_LIST } from "./constant";

export const meetingData = (data = [], action) => {
  switch (action.type) {
    case SET_MEETING_LIST:
      return [...action.data];
    default:
      return data;
  }
};
