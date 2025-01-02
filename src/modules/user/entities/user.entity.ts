import { BaseEntity } from 'src/core/base.entity';

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  role: 'admin' | 'user';
}
