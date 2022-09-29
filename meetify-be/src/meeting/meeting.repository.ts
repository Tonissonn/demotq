import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Meeting, MeetingDocument } from "./schema/meeting";
import { MeetingRepository } from "./interfaces/MeetingRepository";
import { MongoGenericRepository } from "src/shared/MongoGenericRepository";

@Injectable()
export class MeetingRepositoryImpl extends MongoGenericRepository<Meeting> implements MeetingRepository {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>) {
    super(meetingModel);
  }

  async findOwnedById(id: string): Promise<Meeting[]> {
    return await this.meetingModel.find({ ownerId: id }).exec();
  }

  async findParticipationById(id: string): Promise<Meeting[]> {
    return await this.meetingModel.find({ participantsId: id }).exec();
  }
}
