import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TOKENS } from 'src/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    JwtModule.register({
      secret: TOKENS.ACCESS_TOKEN_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'norma.labadie63@ethereal.email',
          pass: 'AQA1Zc7RrjuhB7RfT2',
        },
      },
      options: {},
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
