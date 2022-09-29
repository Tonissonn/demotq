export interface InterfaceRepository<T> {
  findAll(): Promise<T[]>;

  findOne(name: string): Promise<T>;

  create(item: T): Promise<T>;

  update(id: string, item: T): Promise<T>;

  delete(name: string): Promise<T>;
}
