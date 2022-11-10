import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Item } from './item';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Clients' })
  clientId: Types.ObjectId;

  @Prop({ default: false })
  delivered: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop(
    raw({
      conceptId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Concepts',
      },
      amountForConcept: { default: 1, type: Number },
    }),
  )
  items: Item[];
}

export const PackageSchema = SchemaFactory.createForClass(Package);
