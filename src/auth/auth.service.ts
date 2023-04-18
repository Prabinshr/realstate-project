import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/types/token.type';
import { TOKENS } from 'src/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // Generates Access & Refresh Token
  async generateTokens(payload): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: TOKENS.ACCESS_TOKEN_SECRET,
      expiresIn: TOKENS.ACCESS_EXPIRES_IN,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: TOKENS.REFRESH_TOKEN_SECRET,
      expiresIn: TOKENS.REFRESH_EXPIRES_IN,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  signin(signInDto: SignInDto) {}

  signup() {}

  forgetPassword() {}
}
