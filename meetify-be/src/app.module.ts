import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { RoomModule } from "./room/room.module";
import { MeetingModule } from "./meeting/meeting.module";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesGuard } from "./user/roles/role.guards";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    RoomModule,
    MeetingModule,
    MongooseModule.forRoot("mongodb://localhost/nest"),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
  ],
  providers: [RolesGuard],
})
export class AppModule {}
