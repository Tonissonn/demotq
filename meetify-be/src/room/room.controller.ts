import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateRoomDTO } from "./models/create.room";
import { Room } from "./schema/room";
import { UpdateRoomDTO } from "./models/update.room";
import { Roles } from "src/user/roles/roles.decorator";
import { JwtAuthGuard } from "src/user/auth/jwt-auth.guards";
import { RolesGuard } from "src/user/roles/role.guards";
import { Role } from "src/user/roles/role.enum";
import { RoomService } from "./interfaces/RoomService";

@Controller("room")
export class RoomController {
  constructor(@Inject(RoomService) private readonly roomService: RoomService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCatDto: CreateRoomDTO) {
    await this.roomService.create(createCatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":name")
  async findOne(@Param("name") name: string): Promise<Room> {
    return this.roomService.findOne(name);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateRoomDTO: UpdateRoomDTO): Promise<Room> {
    return this.roomService.update(id, updateRoomDTO);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":name")
  async delete(@Param("name") name: string): Promise<Room> {
    return this.roomService.delete(name);
  }
}
