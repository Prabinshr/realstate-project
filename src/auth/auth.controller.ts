import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { UpdatePasswordDto } from './dto/';
import { UploadedFile } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AtAuthGuard, RtAuthGuard } from './guards';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  async signin(@Body() signInDto: SignInDto): Promise<Object> {
    return await this.authService.login(signInDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Auth Sign Up' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed up.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async signup(@Body() signUpDto: CreateUserDto): Promise<Object> {
    return await this.authService.signup(signUpDto);
  }

  @Post('upload-profile')
  @ApiOperation({ summary: 'Profile Picture Upload' })
  @ApiResponse({
    status: 201,
    description: 'Profile Picture Has Been Successfully Uploaded.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, cb) => {
          // console.log(req.user);
          const id = req.user['id'];

          const filename = `${
            file.originalname.split('.')[0]
          }-${id}-${Date.now()}${extname(file.originalname)}`;

          cb(null, filename);
        },
      }),
    }),
  )
  async uploadProfile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Object> {
    console.log(file);

    return {
      message: 'Profile Picture Uploaded !!!',
    };
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Auth Forget Password' })
  @ApiResponse({
    status: 201,
    description: 'Password Reset Link Has Been Sent To Your Email.',
  })
  async forgetPassword(@Body() body: { email: string }): Promise<Object> {
    return await this.authService.forgetPassword(body.email);
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
  ): Promise<Object> {
    const { password, confirmPassword } = body;

    return await this.authService.resetPassword(
      reset_token,
      password,
      confirmPassword,
    );
  }

  @Post('update-password')
  @UseGuards(AtAuthGuard)
  @ApiOperation({ summary: 'Auth Update Password' })
  @ApiResponse({
    status: 201,
    description: 'Password Has Been Updated Successfully.',
  })
  async updatePassword(
    @Req() req: Request,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<Object> {
    return await this.authService.updatePassword(req.user, updatePassword);
  }

  @Post('refresh-token')
  @UseGuards(RtAuthGuard)
  @ApiOperation({ summary: 'Get New Access & Refresh Tokens' })
  @ApiResponse({
    status: 201,
    description: 'New Access & Refresh Tokens Sent Successfully',
  })
  async refreshToken(@Req() req: Request): Promise<Object> {
    return await this.authService.refreshToken(req.user);
  }
}
