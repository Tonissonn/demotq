import { CreateMeetingDTO } from "../models/create.meeting";
import { UpdateMeetingDTO } from "../models/update.meeting";
import { Meeting } from "../schema/meeting";

export interface MeetingService {
  create(createMeetingDto: CreateMeetingDTO): Promise<Meeting>;

  findAll(): Promise<Meeting[]>;

  findOne(name: string): Promise<Meeting>;

  findOwnedById(id: string): Promise<Meeting[]>;

  findParticipationById(id: string): Promise<Meeting[]>;

  delete(name: string): Promise<Meeting>;

  update(id: string, updateMeetingDTO: UpdateMeetingDTO): Promise<Meeting>;
}
export const MeetingService = Symbol("MeetingService");
