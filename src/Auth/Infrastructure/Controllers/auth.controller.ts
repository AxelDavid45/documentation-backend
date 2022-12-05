import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../Application/auth.service';
import { UserPasswordGuard } from '../../Application/Strategies/user-password/user-password.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserPasswordGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
