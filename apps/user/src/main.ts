import { NestFactory, Reflector } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/prisma';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'libs/common/swagger/swagger';

async function bootstrap() {
    const app = await NestFactory.create(UserModule);

    app.enableCors({
        credentials: true,
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        optionsSuccessStatus: 200,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            disableErrorMessages: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        })
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    setupSwagger(app);

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
