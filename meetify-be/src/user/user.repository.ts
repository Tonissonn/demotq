import { Model } from "mongoose";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user";
import { CreateUserDTO } from "./models/create.user";
import * as bcrypt from "bcrypt";
import { UserRepository } from "./interfaces/UserRepository";
import { MongoGenericRepository } from "src/shared/MongoGenericRepository";

@Injectable()
export class UserRepositoryImpl extends MongoGenericRepository<User> implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async checkPass(email: string, pass: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ email: email }).exec();
    if (foundUser === null) {
      throw new NotFoundException("Invalid email");
    }

    if (!(await bcrypt.compare(pass, foundUser.password))) {
      throw new UnauthorizedException("Invalid match");
    }

    return foundUser;
  }

  async findOne(email: string): Promise<UserDocument> {
    const foundUser = await this.userModel.findOne({ email: email }).exec();

    if (foundUser === null) {
      throw new NotFoundException("Invalid email");
    }

    return foundUser;
  }

  async delete(id: string): Promise<User> {
    let deletedUser: CreateUserDTO;

    try {
      deletedUser = await this.userModel.findOne({ _id: id }).exec();
    } catch (err) {
      throw new NotFoundException("Invalid id");
    }

    this.userModel.findByIdAndRemove({ _id: id }).exec();

    return deletedUser;
  }
}
