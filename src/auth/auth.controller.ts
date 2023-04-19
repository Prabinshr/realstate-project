import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  signup() {}

  @Post('forget-password')
  async forgetPassword(@Body() body: { email: string }) {
    if (await this.authService.forgetPassword(body.email))
      return { message: 'Reset Password Link Has Been Sent To Your Email' };
  }

  @Post('reset-password/:reset_token')
  resetPassword(
    @Param('reset_token', ParseIntPipe) reset_token: bigint,
    @Body() body: { password: string; confirmPassword: string },
  ) {
    return this.authService.resetPassword(
      reset_token,
      body.password,
      body.confirmPassword,
    );
  }
}
