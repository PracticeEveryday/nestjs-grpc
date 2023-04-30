import { ClassProvider, MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';

import { CustomConfigModule } from 'libs/config/config.module';
import { PrismaModule } from '@app/prisma';
import { CustomWinstonModule } from 'libs/winston/winston.module';
import { LoggerMiddleware } from 'libs/common/middleware/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from 'libs/common/exception/filter/http-exception.filter';
import { HttpResponseInterceptor } from 'libs/common/interceptors/http-response.interceptors';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/command/create-user/create-user.handler';
import { CreateUserCommand } from './application/command/create-user/create-user.command';
import { UserDomainService } from './domain/inboundPort/userDomain.service';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';

const filters: ClassProvider[] = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];
const interceptors: ClassProvider[] = [{ provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor }];
const handlers = [CreateUserHandler];
const commands = [CreateUserCommand];
const repositories = [UserRepositoryImpl];
@Module({
    imports: [CustomConfigModule, PrismaModule, CustomWinstonModule, CqrsModule],
    controllers: [UserController],
    providers: [UserDomainService, ...filters, ...interceptors, ...handlers, ...commands, ...repositories],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
