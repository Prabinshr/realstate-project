import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [AuthModule, UserModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
