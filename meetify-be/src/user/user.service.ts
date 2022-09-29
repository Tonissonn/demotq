import { Inject, Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schema/user";
import { CreateUserDTO } from "./models/create.user";
import { UserService } from "./interfaces/UserService";
import { UserRepository } from "./interfaces/UserRepository";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(email: string): Promise<UserDocument> {
    return this.userRepository.findOne(email);
  }

  async checkPass(email: string, pass: string): Promise<User> {
    return this.userRepository.checkPass(email, pass);
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser;
  }
}
