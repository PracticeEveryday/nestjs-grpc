import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class BaseException extends HttpException {
    @ApiProperty({ description: '응답코드' })
    statusCode: number;

    @ApiProperty({ description: '에러 제목' })
    title: string;

    @ApiProperty({ description: '에러 메시지' })
    override message: string;

    @ApiProperty({ description: '에러 수준' })
    level: 'warn' | 'error';

    @Exclude()
    raw: Error;

    constructor(properties: Pick<BaseException, 'statusCode' | 'title' | 'message' | 'raw'>) {
        super(properties.message, properties.statusCode);
    }
}
