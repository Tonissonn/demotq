import { CreateUserDTO } from "../models/create.user";
import { User, UserDocument } from "../schema/user";

export interface UserService {
  create(createUserDto: CreateUserDTO): Promise<User>;

  findAll(): Promise<User[]>;

  findOne(email: string): Promise<UserDocument>;

  checkPass(email: string, pass: string): Promise<User>;

  delete(id: string): Promise<User>;
}
export const UserService = Symbol("UserService");
