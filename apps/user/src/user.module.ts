import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CustomConfigModule } from 'libs/config/config.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [CustomConfigModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
