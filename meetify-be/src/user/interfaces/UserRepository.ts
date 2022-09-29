import { InterfaceRepository } from "src/shared/InterfaceRepository";
import { CreateUserDTO } from "../models/create.user";
import { User, UserDocument } from "../schema/user";

export interface UserRepository extends InterfaceRepository<User> {
  findOne(email: string): Promise<UserDocument>;

  checkPass(email: string, pass: string): Promise<User>;

  delete(id: string): Promise<User>;

  create(createUserDto: CreateUserDTO): Promise<User>;
}
export const UserRepository = Symbol("UserRepository");
