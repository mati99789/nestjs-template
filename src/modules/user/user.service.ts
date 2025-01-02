import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { IRepository } from 'src/shared/interfaces/repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IRepository<UserEntity>')
    private readonly userRepository: IRepository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.role = 'user';
    return this.userRepository.create(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.update(id, dto);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
