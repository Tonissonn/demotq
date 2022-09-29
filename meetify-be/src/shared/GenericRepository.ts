import { InterfaceRepository } from "./InterfaceRepository";

export abstract class GenericRepository<T> implements InterfaceRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract findOne(name: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T): Promise<T>;

  abstract delete(name: string): Promise<T>;
}
