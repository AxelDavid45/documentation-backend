import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Domain/user';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UserCreatorService } from './Application/user-creator.service';
import { UserFinderService } from './Domain/user-finder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserCreatorService, UserFinderService],
  exports: [UserFinderService],
})
export class UserModule {}
