import { ClassProvider, MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CustomConfigModule } from 'libs/config/config.module';
import { PrismaModule } from '@app/prisma';
import { CustomWinstonModule } from 'libs/winston/winston.module';
import { LoggerMiddleware } from 'libs/common/middleware/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from 'libs/common/exception/http-exception.filter';
import { HttpResponseInterceptor } from 'libs/common/interceptors/http-response.interceptors';

const filters: ClassProvider[] = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];
const interceptors: ClassProvider[] = [{ provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor }];

@Module({
    imports: [CustomConfigModule, PrismaModule, CustomWinstonModule],
    controllers: [UserController],
    providers: [UserService, ...filters, ...interceptors],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
