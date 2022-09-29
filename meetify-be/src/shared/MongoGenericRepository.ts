import { NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { GenericRepository } from "./GenericRepository";

export class MongoGenericRepository<T> implements GenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>) {
    this._repository = repository;
  }
  async findAll(): Promise<T[]> {
    return this._repository.find().exec();
  }
  async findOne(name: string): Promise<T> {
    const foundT = await this._repository.findOne({ name: name }).exec();
    if (foundT === null) {
      throw new NotFoundException("Invalid name");
    }
    return foundT;
  }
  async delete(name: string): Promise<T> {
    const deletedT = await this._repository.findOneAndDelete({ name: name }).exec();
    if (deletedT === null) {
      throw new NotFoundException("Invalid name");
    }
    return deletedT;
  }

  async create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  async update(id: string, item: T): Promise<T> {
    const newT = await this._repository.findByIdAndUpdate(id, item);
    if (newT === null) {
      throw new NotFoundException("Invalid id");
    }
    return newT;
  }
}
