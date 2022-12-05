import { UserFinderService } from '../../Users/Domain/user-finder.service';
import { UserLoginDto } from './Dto/user-login.dto';

import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../Users/Domain/user';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private userFinder: UserFinderService) {}

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

    if (!isPasswordValid) {
      return null;
    }
    delete user.password;
    return user;
  }
}
