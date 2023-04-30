import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserReqDto {
    @ApiProperty({ required: true, example: '김동현' })
    @IsString()
    @IsNotEmpty()
    userName: string;

    @ApiProperty({ required: true, example: '12345678a' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
