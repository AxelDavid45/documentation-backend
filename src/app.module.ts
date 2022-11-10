import { Module } from '@nestjs/common';
import { SharedModule } from './Shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
