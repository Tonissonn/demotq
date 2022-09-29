import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "../roles/role.enum";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role;
}
