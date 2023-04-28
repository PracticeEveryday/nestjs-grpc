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
            // dto에 없는 속성을 거른다.
            whitelist: true,
            //전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생합니다.
            forbidNonWhitelisted: true,
            //Error가 발생 했을 때 Error Message를 표시 여부 설정(true: 표시하지 않음, false: 표시함)
            disableErrorMessages: true,
            //네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체입니다.
            //객체를 자동으로 DTO로 변환을 원하면 transform 값을 true로 설정한다.
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
