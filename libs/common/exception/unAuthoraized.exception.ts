import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ApiProperty } from '@nestjs/swagger';

export class UnAuthoraizedException extends BaseException {
    constructor(properties: Pick<BaseException, 'statusCode' | 'title' | 'level' | 'message' | 'raw'>) {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            title: properties.title,
            message: properties.message,
            raw: properties.raw,
            level: properties.level,
        });
    }
    @ApiProperty({ description: '응답코드', example: 401 })
    override statusCode: number;

    @ApiProperty({ description: '에러 제목', example: '접근 권한이 없습니다.' })
    override title: string;

    @ApiProperty({ description: '에러 메시지', example: '접근 권한이 없습니다.' })
    override message: string;
}
