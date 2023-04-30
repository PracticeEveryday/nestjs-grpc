import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';
import { Inject } from '@nestjs/common';
import { UserSerivcePort } from 'apps/user/src/domain/inboundPort/userDomainService.port';
import { UserDomainService } from 'apps/user/src/domain/inboundPort/userDomain.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject(UserDomainService) private userDomainService: UserSerivcePort) {}

    public async execute(command: CreateUserCommand) {
        return await this.userDomainService.signUp(command);
    }
}
