import { SET_ROOM_LIST } from "./constant";

export const roomData = (data = [], action) => {
  switch (action.type) {
    case SET_ROOM_LIST:
      return [...action.data];
    default:
      return data;
  }
};
