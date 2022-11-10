import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { configSchema } from './Config/schema-envs';
import { ApiConfigService } from './Config/api-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '..', '.env'),
      validationSchema: configSchema,
      validationOptions: {
        stripUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class SharedModule {}
