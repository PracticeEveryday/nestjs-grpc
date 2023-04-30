// import { Command, CommandProps } from '🔥/libs/ddd/command.base';
import { ICommand } from '@nestjs/cqrs';

class Properties {
    readonly userName: string;
    password: string;
}

export class CreateUserCommand extends Properties implements ICommand {
    constructor(props: Properties) {
        super();
        Object.assign(this, props);
    }
}
