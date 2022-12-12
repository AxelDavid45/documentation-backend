import { UserFinderService } from '../../Users/Domain/user-finder.service';
import { UserLoginDto } from '../Dto/user-login.dto';

import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../Users/Domain/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private userFinder: UserFinderService,
    private jwtService: JwtService,
  ) {}

  async validateUserLoginData(data: UserLoginDto): Promise<User | null> {
    const user = await this.userFinder
      .searchUser({ email: data.email })
      .catch((error) => {
        this.logger.error(`Error searching for user with email ${data.email}`);
        this.logger.error(error.message, error.stack);
        throw error;
      });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt
      .compare(data.password, user.password)
      .catch((error) => {
        this.logger.error(`Error comparing password for user ${user._id}`);
        this.logger.error(error.message, error.stack);
        throw error;
      });

    console.log(
      `Validatig data for user ${data.email}, isPasswordValid: ${isPasswordValid}`,
    );

    if (!isPasswordValid) {
      return null;
    }
    delete user.password;
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
