import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LocalStrategy, AtStrategy, RtStrategy } from './strategy';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [PassportModule, MulterModule.register({ dest: './uploads' })],
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
