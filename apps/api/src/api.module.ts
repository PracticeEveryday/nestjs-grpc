import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CustomConfigModule } from 'libs/config/config.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [CustomConfigModule, PrismaModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
