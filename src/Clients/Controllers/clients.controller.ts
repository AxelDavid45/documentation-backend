import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../Auth/Strategies/jwt/jwt.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor() {}

  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
