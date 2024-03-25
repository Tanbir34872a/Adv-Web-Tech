import { Controller, Post, Body, UseInterceptors, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './jwt.interceptor';
import { Response } from 'express';
import { LoginDto } from './login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(JwtInterceptor)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { uname, pass } = loginDto;
    const jwtToken = await this.authService.verify(uname, pass);
    return { jwtToken };
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt'); // Assuming 'auth_cookie' is the name of your authentication cookie
    return res.status(HttpStatus.OK).send();
  }

}
