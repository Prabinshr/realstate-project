import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LocalStrategy, AtStrategy, RtStrategy } from './strategy';
import { TOKENS } from 'config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: TOKENS.ACCESS_TOKEN_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'london.auer9@ethereal.email',
          pass: 'mfrp4MHmwp4kKVSJw9',
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    LocalStrategy,
    AtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
