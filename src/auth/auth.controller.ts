import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { UpdatePasswordDto } from './dto/';
import { Me } from 'src/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Tokens } from './types/token.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Auth login' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed in.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  signin(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
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
  @ApiOperation({ summary: 'Auth Forget Password' })
  @ApiResponse({
    status: 201,
    description: 'Password Reset Link Has Been Sent To Your Email.',
  })
  async forgetPassword(@Body() body: { email: string }) {
    if (await this.authService.forgetPassword(body.email))
      return { message: 'Reset Password Link Has Been Sent To Your Email' };
  }

  @Post('reset-password/:reset_token')
  @ApiOperation({ summary: 'Auth Reset Password' })
  @ApiResponse({
    status: 201,
    description: 'Password Reset Successfully.',
  })
  async resetPassword(
    @Param('reset_token', ParseIntPipe) reset_token: bigint,
    @Body() body: { password: string; confirmPassword: string },
  ): Promise<{ message: string; tokens: Tokens }> {
    const tokens = await this.authService.resetPassword(
      reset_token,
      body.password,
      body.confirmPassword,
    );

    return {
      message: 'Password Reset Successfully !!!',
      tokens,
    };
  }

  @Post('update-password')
  @ApiOperation({ summary: 'Auth Update Password' })
  @ApiResponse({
    status: 201,
    description: 'Password Has Been Updated Successfully.',
  })
  @UseGuards(LocalAuthGuard)
  async updatePassword(
    @Me() me: Partial<CreateUserDto>,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<{ message: string; tokens: Tokens }> {
    const tokens = await this.authService.updatePassword(me, updatePassword);

    return {
      message: 'Password Updated Successfully',
      tokens,
    };
  }

  @Post('refresh-token')
  refreshToken() {}

  @Post('logout')
  logout() {}
}
