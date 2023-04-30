import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CustomConfigModule } from 'libs/config/config.module';

@Global()
@Module({
    imports: [CustomConfigModule],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
