import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { ApiConfigService } from '../../../Shared/Config/api-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private apiConfigService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.jwtConfigs.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    console.log(`JWT validated for user ${payload.sub}`);
    return payload;
  }
}
