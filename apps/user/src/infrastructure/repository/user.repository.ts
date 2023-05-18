import { PrismaService } from '@app/prisma';
import { User } from '@prisma/client';
import { RepositoryInterface } from 'libs/common/interface/repository.interface';
import { CreateUserReqDto } from '../../interface/dto/request/createUser.req.dto';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mapper/user.mapper';
import { UserDomain } from '../../domain/user.domain';

export interface UserRepositoryInterface extends RepositoryInterface<UserDomain> {
    create(userInfo: Partial<User>): Promise<UserDomain>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}

    public async create(createUserReqDto: CreateUserReqDto): Promise<UserDomain> {
        const user = await this.prisma.user.create({ data: createUserReqDto });

        return UserMapper.toRequiredDomain(user);
    }

    public async findOneById(userId: number): Promise<UserDomain> {
        const user = await this.prisma.user.findUniqueOrThrow({ where: { userId } });

        return UserMapper.toRequiredDomain(user);
    }
}
