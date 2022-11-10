import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.READ_ONLY })
  role: Role;

  @Prop({ default: new Date() })
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
