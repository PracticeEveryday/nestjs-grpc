import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UnknownException } from './internal-server.exception';
import { BaseException } from './base.exception';
import { CustomLoggerService } from 'libs/winston/logger.service';
import { ErrorLevel } from '../enum/basic.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly loggerService: CustomLoggerService) {}

    catch(error: Error, host: ArgumentsHost) {
        const exception = (() => {
            if (error instanceof BaseException) {
                return error;
            } else if (error instanceof HttpException) {
                return new BaseException({
                    statusCode: error.getStatus(),
                    title: error.name,
                    message: error.message,
                    raw: error,
                });
            } else {
                return new UnknownException({
                    title: error.name,
                    message: error.message,
                    raw: error,
                });
            }
        })();
        if (exception.level === ErrorLevel.WARN) {
            this.loggerService.warn(HttpExceptionFilter.name, exception);
        } else {
            this.loggerService.error(HttpExceptionFilter.name, exception);
        }

        this.httpAdapterHost.httpAdapter.reply((() => host.switchToHttp().getResponse())(), exception.getResponse(), exception.getStatus());
    }
}
