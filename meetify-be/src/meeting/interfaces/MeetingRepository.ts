import { InterfaceRepository } from "src/shared/InterfaceRepository";
import { Meeting } from "../schema/meeting";

export interface MeetingRepository extends InterfaceRepository<Meeting> {
  findOwnedById(id: string): Promise<Meeting[]>;

  findParticipationById(id: string): Promise<Meeting[]>;
}
export const MeetingRepository = Symbol("MeetingRepository");
