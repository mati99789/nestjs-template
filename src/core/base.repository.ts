import { IRepository } from 'src/shared/interfaces/repository.interface';

export abstract class BaseRepository<T> implements IRepository<T> {
  abstract create(entity: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T | null>;
  abstract update(id: string, entity: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
