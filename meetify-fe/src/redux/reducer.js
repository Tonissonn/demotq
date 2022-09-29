import { ADD_TO_MEETINGS, REMOVE_FROM_MEETINGS } from "./constant";

export const meetingListData = (data = [], action) => {
  switch (action.type) {
    case ADD_TO_MEETINGS:
      return [action.data, ...data];
    case REMOVE_FROM_MEETINGS:
      const remainingItems = data.filter((item) => item.id !== action.data);
      return [...remainingItems];
    default:
      return data;
  }
};
