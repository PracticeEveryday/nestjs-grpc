import { CreateUserReqDto } from '../../interface/dto/request/createUser.req.dto';
import { UserDomain } from '../user.domain';

export interface UserSerivcePort {
    signUp(createUserReqDto: CreateUserReqDto): Promise<UserDomain>;
}
