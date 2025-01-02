export interface IRepository<T> {
    create(entity: T): Promise<T>;
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    update(id: string, entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
  }
  