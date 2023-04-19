import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService,UserService, JwtService,LocalStrategy],
})
export class AuthModule {}
