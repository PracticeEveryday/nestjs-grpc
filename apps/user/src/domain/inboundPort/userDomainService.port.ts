import { User } from '@prisma/client';
import { CreateUserReqDto } from '../../interface/dto/request/createUser.req.dto';

export interface UserSerivcePort {
    signUp(createUserReqDto: CreateUserReqDto): Promise<User>;
}
