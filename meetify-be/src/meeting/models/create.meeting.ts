import { IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateMeetingDTO {
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

  @IsArray()
  participantsId: string[];

  @IsString()
  @IsNotEmpty()
  roomId: string;
}
