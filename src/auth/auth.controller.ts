import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Auth login' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed in.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Auth Sign-up' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed up.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
