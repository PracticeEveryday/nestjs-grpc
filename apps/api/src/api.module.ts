import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CustomConfigModule } from 'libs/config/config.module';

@Module({
  imports: [CustomConfigModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
