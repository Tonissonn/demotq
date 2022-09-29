import { InterfaceRepository } from "src/shared/InterfaceRepository";
import { Room } from "../schema/room";

export interface RoomRepository extends InterfaceRepository<Room> {}
export const RoomRepository = Symbol("RoomRepository");
