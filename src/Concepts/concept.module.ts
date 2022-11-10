import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Concept, ConceptSchema } from './Domain/concept';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
  ],
})
export class ConceptModule {}
