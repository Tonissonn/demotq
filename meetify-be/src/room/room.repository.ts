import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room, RoomDocument } from "./schema/room";
import { MongoGenericRepository } from "src/shared/MongoGenericRepository";
import { RoomRepository } from "./interfaces/RoomRepository";

@Injectable()
export class RoomRepositoryImpl extends MongoGenericRepository<Room> implements RoomRepository {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {
    super(roomModel);
  }
}
