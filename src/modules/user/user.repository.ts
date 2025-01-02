import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  async create(entity: UserEntity): Promise<UserEntity> {
    throw new Error('Repository method not implemented. Choose an ORM.');
  }

  async findAll(): Promise<UserEntity[]> {
    throw new Error('Repository method not implemented. Choose an ORM.');
  }

  async findOne(id: string): Promise<UserEntity | null> {
    throw new Error('Repository method not implemented. Choose an ORM.');
  }

  async update(id: string, entity: Partial<UserEntity>): Promise<UserEntity> {
    throw new Error('Repository method not implemented. Choose an ORM.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Repository method not implemented. Choose an ORM.');
  }
}
