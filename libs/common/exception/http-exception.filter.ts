import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from './base.exception';
import { UnknownException } from './internal-server.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        if (exception instanceof BaseException) {
            res.status(exception.statusCode).json(exception);
        } else {
            const prop = {
                title: 'internal server error',
                message: exception.message,
                raw: exception,
            };
            const unkownException = new UnknownException(prop);
            res.status(unkownException.statusCode).json(unkownException);
        }
    }
}
