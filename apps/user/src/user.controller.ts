import { Get, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RouteTable } from 'libs/common/decorators/routerTable.decorator';
import { Route } from 'libs/common/decorators/router.decorator';
import { Method, RouterCategory } from 'libs/common/enum/basic.enum';

@RouteTable({
    path: 'user',
    tag: {
        category: RouterCategory.PUBLIC,
        title: '유저API',
    },
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Route({
        request: {
            method: Method.GET,
            path: '/',
        },
        response: {
            code: HttpStatus.OK,
        },
        description: '테스트 API입니다',
        summary: '테스트 API입니다.',
    })
    getHello(): string {
        return this.userService.getHello();
    }
}
