import { Body, HttpStatus, ValidationPipe } from '@nestjs/common';
import { RouteTable } from 'libs/common/decorators/routerTable.decorator';
import { Route } from 'libs/common/decorators/router.decorator';
import { Method, RouterCategory } from 'libs/common/enum/basic.enum';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserReqDto } from './dto/request/createUser.req.dto';
import { CreateUserCommand } from '../application/command/create-user/create-user.command';

@RouteTable({
    path: 'user',
    tag: {
        category: RouterCategory.PUBLIC,
        title: '유저API',
    },
})
export class UserController {
    constructor(private readonly commandBus: CommandBus) {}

    @Route({
        request: {
            method: Method.POST,
            path: '/',
        },
        response: {
            code: HttpStatus.OK,
        },
        description: '유저 생성 API입니다.',
        summary: '유저 생성API.',
    })
    public async signUp(@Body(ValidationPipe) ceateUserReqDto: CreateUserReqDto) {
        return await this.commandBus.execute(new CreateUserCommand(ceateUserReqDto));
    }
}
