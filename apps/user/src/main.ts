import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/prisma';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHook(app);

  if (PORT && typeof PORT === 'number') {
    await app.listen(PORT);

    console.log(`Application is running on: ${await app.getUrl()}`);
  }
}
bootstrap();