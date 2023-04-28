import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class UnAuthoraizedException extends BaseException {
    constructor(properties: Pick<BaseException, 'title' | 'message' | 'raw'>) {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            title: properties.title,
            message: properties.message,
            raw: properties.raw,
        });
    }
}
