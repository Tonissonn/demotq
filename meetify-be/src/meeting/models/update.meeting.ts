import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class UpdateMeetingDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  participantsId: string[];

  @IsString()
  @IsNotEmpty()
  roomId: string;
}
