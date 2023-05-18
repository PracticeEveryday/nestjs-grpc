import { AggregateRoot } from '@nestjs/cqrs';

export type userRequiredProps = Required<{
    readonly userId: number;
    readonly userName: string;
    readonly password: string;
}>;

export type userOptionalProps = Partial<{
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;
}>;

export type userProps = userRequiredProps & Required<userOptionalProps>;

export interface User {
    properties: () => userProps;
}

export class UserDomain extends AggregateRoot implements User {
    private readonly userId: number;
    private userName: string;
    private password: string;
    private address: string | null;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private readonly deletedAt: Date | null;

    constructor(properties: userRequiredProps & userOptionalProps) {
        super();
        Object.assign(this, properties);
    }

    public properties() {
        return {
            userId: this.userId,
            userName: this.userName,
            password: this.password,
            address: this.address,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
}
