import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/types/token.type';
import { TOKENS } from 'src/config';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
// import { argon2d } from 'argon2';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

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
  //prashant
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const hashPassword = await argon.verify(user.password, password);
    if (!user || !hashPassword) return false;
    return user;
  }

  async login(signInDto: SignInDto): Promise<any> {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      return null;
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: TOKENS.ACCESS_TOKEN_SECRET,
        expiresIn: TOKENS.ACCESS_EXPIRES_IN,
      }),
    };
  }
  signup() {}

  async forgetPassword(email: string): Promise<Boolean> {
    const user = this.prisma.user.findFirst({ where: { email } });

    if (!user) throw new BadRequestException('Invalid Email');

    // Insert Email, Password Reset Token & Password Reset Token Expiration Date
    // in the Reset Password Database Model
    const newResetPassword = await this.prisma.resetPassword.upsert({
      where: {
        email,
      },
      create: {
        email,
        pass_reset_token: Math.floor(Math.random() * 9000000000) + 1000000000,
        pass_reset_token_expires: Date.now() + 10 * 60 * 1000,
      },
      update: {
        pass_reset_token: Math.floor(Math.random() * 9000000000) + 1000000000,
        pass_reset_token_expires: Date.now() + 10 * 60 * 1000,
      },
    });

    // Sending Email with Reset Link
    const link = `http://127.0.0.1:3000/auth/reset-password/${newResetPassword.pass_reset_token}`;

    await this.mailerService.sendMail({
      to: email,
      from: 'hellokrish010@gmail.com',
      subject: 'Reset Password Link',
      text: 'Click On The Button Below To Reset Password',
      html: `<a href='${link}'>Reset Link</a>`,
    });

    return true;
  }

  async resetPassword(
    reset_token: bigint,
    password: string,
    confirmPassword: string,
  ) {
    // Checking If Valid Token Exists & If the Token Has Not Expired
    const user = await this.prisma.resetPassword.findFirst({
      where: {
        pass_reset_token: reset_token,
        pass_reset_token_expires: { gt: Date.now() },
      },
    });

    if (!user) throw new HttpException('Reset Token Has Expired', 498);

    // If User Exists Then Reset Password
    const userWithNewPass = await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password,
      },
    });

    // Removing the Field from "Reset Password Database"
    await this.prisma.resetPassword.delete({
      where: {
        email: user.email,
      },
    });

    // Logging In User & Sending Access Token And Refresh Token
    const tokens = await this.generateTokens(userWithNewPass.email);

    return {
      message: 'Password Reset Successfully !!!',
      tokens,
    };
  }
}
