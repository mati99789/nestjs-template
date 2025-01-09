import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface IHashService {
  hash(data: string, saltRounds: number): Promise<string>;
  compare(data: string, hashedData: string): Promise<boolean>;
}

@Injectable()
export class BcryptHashService implements IHashService {
  async hash(data: string, salt: number): Promise<string> {
    return bcrypt.hash(data, salt);
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(data, hashedData);
  }
}
