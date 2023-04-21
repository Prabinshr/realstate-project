import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { InquiryModule } from 'src/inquiry/inquiry.module';
import { JwtModule } from '@nestjs/jwt';
import { TOKENS } from 'config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    InquiryModule,
    JwtModule.register({
      secret: TOKENS.ACCESS_TOKEN_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'helga.mayert@ethereal.email',
          pass: 'gXPd5uW1ZTVmfK4rk2',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
