import { ADD_TO_MEETINGS, REMOVE_FROM_MEETINGS } from "./constant";

export const addToMeetings = (data) => {
  return {
    type: ADD_TO_MEETINGS,
    data,
  };
};

export const removeFromMeetings = (data) => {
  return {
    type: REMOVE_FROM_MEETINGS,
    data,
  };
};
