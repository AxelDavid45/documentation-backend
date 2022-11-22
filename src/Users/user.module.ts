import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Domain/user';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UserCreatorService } from './Application/user-creator.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserCreatorService],
})
export class UserModule {}
