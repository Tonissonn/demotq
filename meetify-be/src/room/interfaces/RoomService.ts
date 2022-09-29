import { CreateRoomDTO } from "../models/create.room";
import { UpdateRoomDTO } from "../models/update.room";
import { Room } from "../schema/room";

export interface RoomService {
  create(createRoomDto: CreateRoomDTO): Promise<Room>;

  findAll(): Promise<Room[]>;

  findOne(name: string): Promise<Room>;

  delete(name: string): Promise<Room>;

  update(id: string, updateRoomDTO: UpdateRoomDTO): Promise<Room>;
}
export const RoomService = Symbol("RoomService");
