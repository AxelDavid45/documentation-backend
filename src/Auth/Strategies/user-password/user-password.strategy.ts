import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../Services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService
      .validateUserLoginData({
        email,
        password,
      })
      .catch((error) => {
        throw error;
      });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
