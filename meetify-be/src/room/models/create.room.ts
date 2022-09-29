import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateRoomDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  capacity: number;

  @IsInt()
  @Min(0)
  futureMeetings: number;

  @IsNotEmpty()
  currentStatus: string;
}
