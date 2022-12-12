import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { UserPasswordGuard } from '../Strategies/user-password/user-password.guard';
import { JwtAuthGuard } from '../Strategies/jwt/jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserPasswordGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
