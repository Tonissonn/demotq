import { Module } from "@nestjs/common";
import { MeetingServiceImpl } from "./meeting.service";
import { MeetingController } from "./meeting.controller";
import { Meeting, MeetingSchema } from "./schema/meeting";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/user/auth/constants";
import { MeetingRepositoryImpl } from "./meeting.repository";
import { MeetingService } from "./interfaces/MeetingService";
import { MeetingRepository } from "./interfaces/MeetingRepository";

const service = { provide: MeetingService, useClass: MeetingServiceImpl };
const repository = { provide: MeetingRepository, useClass: MeetingRepositoryImpl };

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [service, repository],
  controllers: [MeetingController],
  exports: [service],
})
export class MeetingModule {}
