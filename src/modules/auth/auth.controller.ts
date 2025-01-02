import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      response,
    );
  }

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.setAuthCookie(user, response);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  googleAuthCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.handleOAuthLogin(req.user, 'google', res);
  }

  @UseGuards(AuthGuard('github'))
  @Get('github')
  githubAuth() {}

  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  githubAuthCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.handleOAuthLogin(req.user, 'github', res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
