import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user';
import { Model } from 'mongoose';

@Injectable()
export class UserFinderService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async searchUser(params: Record<string, unknown>) {
    return this.userModel.findOne({ ...params });
  }
}
