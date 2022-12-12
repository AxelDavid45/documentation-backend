import { Module } from '@nestjs/common';
import { UserModule } from '../Users/user.module';
import { AuthService } from './Services/auth.service';
import { AuthController } from './Controllers/auth.controller';
import { LocalStrategy } from './Strategies/user-password/user-password.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategies/jwt/jwt.strategy';
import { ApiConfigService } from '../Shared/Config/api-config.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (apiConfigService: ApiConfigService) => ({
        secret: apiConfigService.jwtConfigs.secret,
        signOptions: {
          expiresIn: apiConfigService.jwtConfigs.expiresIn,
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
