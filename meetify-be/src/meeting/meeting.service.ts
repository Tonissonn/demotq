import { Inject, Injectable } from "@nestjs/common";
import { Meeting } from "./schema/meeting";
import { CreateMeetingDTO } from "./models/create.meeting";
import { MeetingRepository } from "./interfaces/MeetingRepository";
import { UpdateMeetingDTO } from "./models/update.meeting";
import { MeetingService } from "./interfaces/MeetingService";

@Injectable()
export class MeetingServiceImpl implements MeetingService {
  constructor(@Inject(MeetingRepository) private readonly meetingRepository: MeetingRepository) {}

  async create(createMeetingDto: CreateMeetingDTO): Promise<Meeting> {
    return this.meetingRepository.create(createMeetingDto);
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingRepository.findAll();
  }

  async findOne(name: string): Promise<Meeting> {
    return this.meetingRepository.findOne(name);
  }

  async findOwnedById(id: string): Promise<Meeting[]> {
    return this.meetingRepository.findOwnedById(id);
  }

  async findParticipationById(id: string): Promise<Meeting[]> {
    return this.meetingRepository.findParticipationById(id);
  }

  async delete(name: string): Promise<Meeting> {
    const deletedMeeting = await this.meetingRepository.delete(name);
    return deletedMeeting;
  }
  async update(id: string, updateMeetingDTO: UpdateMeetingDTO): Promise<Meeting> {
    return this.meetingRepository.update(id, updateMeetingDTO);
  }
}
