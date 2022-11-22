import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../Application/Dto/create-user.dto';
import { UserCreatorService } from '../../Application/user-creator.service';

@Controller('users')
export class UsersController {
  constructor(private userCreatorService: UserCreatorService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userCreatorService.run(body);
  }
}
