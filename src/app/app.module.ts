import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TOKENS } from 'src/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [AuthModule, UserModule,PrismaModule,
  JwtModule.register({
    secret: TOKENS.ACCESS_TOKEN_SECRET
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
