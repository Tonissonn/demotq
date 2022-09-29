import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UpdateRoomDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  capacity: number;

  @IsInt()
  @Min(0)
  futureMeetings: number;

  currentStatus: string;
}
