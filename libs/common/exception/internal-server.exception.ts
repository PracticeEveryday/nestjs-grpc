import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorLevel } from '../enum/basic.enum';

export class UnknownException extends BaseException {
    constructor(properties: Pick<BaseException, 'title' | 'message' | 'raw'>) {
        super({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            title: properties.title,
            message: properties.message,
            raw: properties.raw,
        });
    }

    @ApiProperty({ description: '응답코드', example: 500 })
    override statusCode: number;

    @ApiProperty({ description: '에러 제목', example: '서버측 오류입니다.' })
    override title: string;

    @ApiProperty({ description: '에러 메시지', example: '개발자에게 문의해주세요' })
    override message: string;

    @ApiProperty({ description: '에러 메시지', example: ErrorLevel.ERROR })
    override level: ErrorLevel;
}
