import { PrismaService } from '@app/prisma';
import { User } from '@prisma/client';
import { RepositoryInterface } from 'libs/common/interface/repository.interface';
import { CreateUserReqDto } from '../../interface/dto/request/createUser.req.dto';
import { Injectable } from '@nestjs/common';

export interface UserRepositoryInterface extends RepositoryInterface<User> {
    create(userInfo: Partial<User>): Promise<User>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}

    public async create(createUserReqDto: CreateUserReqDto): Promise<User> {
        return await this.prisma.user.create({ data: createUserReqDto });
    }

    public async findOneById(userId: number): Promise<User> {
        return await this.prisma.user.findUniqueOrThrow({ where: { userId } });
    }
}
