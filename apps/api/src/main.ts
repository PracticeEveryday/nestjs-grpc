import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');
  if (PORT && typeof PORT === 'number') {
    await app.listen(PORT);

    console.log(`Application is running on: ${await app.getUrl()}`);
  }
}
bootstrap();
