import { BaseEntity } from "src/core/base.entity";

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: 'admin' | 'user';
}