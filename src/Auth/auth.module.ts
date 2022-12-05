import { Module } from '@nestjs/common';
import { UserModule } from '../Users/user.module';
import { AuthService } from './Application/auth.service';
import { AuthController } from './Infrastructure/Controllers/auth.controller';
import { LocalStrategy } from './Application/Strategies/user-password/user-password.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
