import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';


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
  @ApiOperation({ summary: 'Forgot Password' })
  forgetPassword() {}
}
