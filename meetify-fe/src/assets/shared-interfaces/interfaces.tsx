import { FC } from "react";

declare global {
  interface RoomDTO {
    _id: string;
    name: string;
    capacity: string;
    futureMeetings: number;
    currentStatus: string;
  }

  interface MeetingDTO {
    _id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    ownerId: string;
    participantsId: string[];
    roomId: string;
  }
  interface UserDTO {
    _id: string;
    name: string;
    email: string;
    role: string;
    exp: number;
  }

  type EntityDTO = RoomDTO | MeetingDTO | UserDTO;

  interface KeyRendererType {
    [key: string]:
      | ((obj: RoomDTO) => JSX.Element)
      | ((obj: MeetingDTO) => JSX.Element)
      | ((obj: UserDTO) => JSX.Element)
      | string;
  }
  interface KeyRendererCallableType {
    [key: string]: FC<
      RoomDTO | { [key: string]: string } | UserDTO | MeetingDTO
    >;
  }
}
export type {};
