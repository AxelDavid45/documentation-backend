import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './Shared/Config/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfigService = app.get(ApiConfigService);
  const port = apiConfigService.appPort;

  await app.listen(port);
  console.log(`App running on port ${port}`);
}

bootstrap().catch((error) => {
  console.error('Error bootstrapping app');
  console.error(error);
});
