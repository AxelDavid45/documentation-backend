import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConceptDocument = HydratedDocument<Concept>;

@Schema()
export class Concept {
  @Prop({ required: true })
  reason: string;

  @Prop({ default: true })
  enabled: boolean;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
