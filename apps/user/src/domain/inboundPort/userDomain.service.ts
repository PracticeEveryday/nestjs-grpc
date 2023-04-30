import { Inject, Injectable } from '@nestjs/common';
import { UserSerivcePort } from './userDomainService.port';
import { CreateUserReqDto } from '../../interface/dto/request/createUser.req.dto';
import { UserRepositoryImpl, UserRepositoryInterface } from '../../infrastructure/repository/user.repository';

@Injectable()
export class UserDomainService implements UserSerivcePort {
    constructor(@Inject(UserRepositoryImpl) private readonly userRepository: UserRepositoryInterface) {}

    public async signUp(ceateUserReqDto: CreateUserReqDto) {
        return await this.userRepository.create(ceateUserReqDto);
    }
}
