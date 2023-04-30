import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UnknownException } from '../internal-server.exception';
import { BaseException } from '../base.exception';
import { CustomLoggerService } from 'libs/winston/logger.service';
import { ErrorLevel } from '../../enum/basic.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly loggerService: CustomLoggerService) {}

    catch(error: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse<Response>();

        const exception = (() => {
            if (error instanceof BaseException) {
                return error;
            } else if (error instanceof HttpException) {
                return new BaseException({
                    statusCode: error.getStatus(),
                    title: error.name,
                    message: error.message,
                    raw: error,
                    level: ErrorLevel.WARN,
                });
            } else {
                return new UnknownException({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    title: error.name,
                    message: error.message,
                    raw: error,
                    level: ErrorLevel.ERROR,
                });
            }
        })();

        if (exception.level === ErrorLevel.WARN) {
            this.loggerService.warn(HttpExceptionFilter.name, exception);
        } else {
            this.loggerService.error(HttpExceptionFilter.name, exception);
        }
        console.log(error);

        res.status(exception.getStatus()).json(exception);
    }
}
