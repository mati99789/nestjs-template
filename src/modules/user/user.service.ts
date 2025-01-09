import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity, UserRole } from './entities/user.entity';
import { IRepository } from 'src/shared/interfaces/repository.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UserService {
  constructor(
    @Inject('IRepository<UserEntity>')
    private readonly userRepository: IRepository<UserEntity>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.role = UserRole.USER;
    return this.userRepository.create(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    this.logger.log('Fetch all users.');
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
