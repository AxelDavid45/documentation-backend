import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { passwordStructure } from '../../../Shared/Domain/password-structure';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
}
