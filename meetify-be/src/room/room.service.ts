import { Inject, Injectable } from "@nestjs/common";
import { Room } from "./schema/room";
import { CreateRoomDTO } from "./models/create.room";
import { UpdateRoomDTO } from "./models/update.room";
import { RoomService } from "./interfaces/RoomService";
import { RoomRepository } from "./interfaces/RoomRepository";

@Injectable()
export class RoomServiceImpl implements RoomService {
  constructor(@Inject(RoomRepository) private readonly roomRepository: RoomRepository) {}

  async create(createRoomDto: CreateRoomDTO): Promise<Room> {
    return this.roomRepository.create(createRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.findAll();
  }

  async findOne(name: string): Promise<Room> {
    return this.roomRepository.findOne(name);
  }

  async delete(name: string): Promise<Room> {
    return this.roomRepository.delete(name);
  }

  async update(id: string, updateRoomDTO: UpdateRoomDTO): Promise<Room> {
    return this.roomRepository.update(id, updateRoomDTO);
  }
}
