import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ErrorLevel, ErrorProps } from '../enum/basic.enum';

export class BaseException extends HttpException {
    @ApiProperty({ description: '응답코드', example: 400 })
    statusCode: number;

    @ApiProperty({ description: '에러 제목', example: '해당 유저를 찾을 수 없습니다.' })
    title: string;

    @ApiProperty({ description: '에러 메시지', example: '비밀번호를 다시 확인해주세요' })
    override message: string;

    @ApiProperty({ description: '에러 수준', example: ErrorLevel.ERROR })
    level: ErrorLevel;

    @Exclude()
    raw: Error;

    constructor(properties: Pick<BaseException, ErrorProps>) {
        super(properties.message, properties.statusCode);
    }
}
