import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';

@Injectable()
export class CustomLoggerService {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

    info(label: string, message: string): void {
        this.logger.log('info', `${label}: ${message}`);
    }

    debug(label: string, message: string): void {
        this.logger.log('debug', `${label}: ${message}`);
    }

    error(label: string, error: Error): void {
        this.logger.error(`${label}: ${[error.message, error.stack].join('\n')}`);
    }

    warn(label: string, error: Error): void {
        this.logger.warn(`${label}: ${[error.message, error.stack].join('\n')}`);
    }
}
