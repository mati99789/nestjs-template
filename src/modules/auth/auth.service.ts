import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { IRepository } from '../../shared/interfaces/repository.interface';
import { Response } from 'express';
import { IHashService } from './hasService';

@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set();

  constructor(
    private jwtService: JwtService,
    @Inject('IRepository<UserEntity>')
    private usersRepository: IRepository<UserEntity>,
    @Inject('IHashService')
    private hashService: IHashService,
  ) {}

  async register(email: string, password: string, response: Response) {
    const user = await this.usersRepository.findOne(email);
    if (user) {
      throw new UnauthorizedException('Email already registered');
    }

    const hashedPassword = await this.hashService.hash(password, 10);
    const newUser = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name: 'Test User',
      role: 'user',
    });

    return this.setAuthCookie(newUser, response);
  }

  async handleOAuthLogin(
    profile: any,
    provider: 'github' | 'google',
    response: Response,
  ) {
    let user = await this.usersRepository.findOne(profile.email);

    if (!user) {
      user = await this.usersRepository.create({
        email: profile.email,
        name: profile.username || profile.name,
        [`${provider}Id`]: profile.id,
        role: 'user',
      });
    }

    return this.setAuthCookie(user, response);
  }

  public async setAuthCookie(user: UserEntity, response: Response) {
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }

  async logout(response: Response) {
    const token = response.req.cookies['access_token'];
    if (token) {
      this.blacklistedTokens.add(token);
    }
    response.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
