import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AllowAnon } from '../common/custom/annotate';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @AllowAnon()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('/getUserInfo')
  getUserInfo(@Request() request) {
    return this.authService.getUserInfo(request.user.username);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProflie(@Request() req) {
    return req.user;
  }
}
