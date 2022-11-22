import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../Domain/user';
import { CreateUserDto } from './Dto/create-user.dto';
import { ApiConfigService } from '../../Shared/Config/api-config.service';
import { passwordValidator } from '../../Shared/Domain/password-structure';

@Injectable()
export class UserCreatorService {
  private readonly logger = new Logger(UserCreatorService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private apiConfigService: ApiConfigService,
  ) {}

  async run(userData: CreateUserDto) {
    const isValidPassword = passwordValidator(userData.password);
    if (!isValidPassword) {
      throw new BadRequestException(
        'Password must contain at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      );
    }
    const encrypted = await bcrypt
      .hash(userData.password, this.apiConfigService.hashSaltsPasswords)
      .catch((error) => {
        this.logger.error('Error hashing password');
        this.logger.error(error);
        throw error;
      });

    const {
      _id: id,
      role,
      lastLogin,
    } = await this.userModel
      .create({
        email: userData.email,
        password: encrypted,
      })
      .catch((error) => {
        this.logger.error(
          `Error inserting user, data: ${JSON.stringify(userData)}`,
        );
        this.logger.error(error.message, error.stack);
        throw error;
      });

    return { id, role, lastLogin };
  }
}
