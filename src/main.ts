import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './Shared/Config/api-config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfigService = app.get(ApiConfigService);
  const port = apiConfigService.appPort;
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, transform: true }),
  );

  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`App running on port ${port}`);
}

bootstrap().catch((error) => {
  console.error('Error bootstrapping app');
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});
