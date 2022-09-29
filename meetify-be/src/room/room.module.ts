import { Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { Room, RoomSchema } from "./schema/room";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomRepositoryImpl } from "./room.repository";
import { UserModule } from "src/user/user.module";
import { jwtConstants } from "src/user/auth/constants";
import { JwtModule } from "@nestjs/jwt";
import { RoomRepository } from "./interfaces/RoomRepository";
import { RoomServiceImpl } from "./room.service";
import { RoomService } from "./interfaces/RoomService";

const service = { provide: RoomService, useClass: RoomServiceImpl };
const repository = { provide: RoomRepository, useClass: RoomRepositoryImpl };

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [service, repository],
  controllers: [RoomController],
  exports: [service],
})
export class RoomModule {}
