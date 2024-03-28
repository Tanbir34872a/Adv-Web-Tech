import { Controller, Post, Body, UseInterceptors, Res, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { JwtInterceptor } from './jwt.interceptor';
import { Response } from 'express';
import { LoginDto } from './login.dto';

//added jwt since it was available to me, also kept logout in same module to save time (will separate later)

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseInterceptors(JwtInterceptor)
  @Post()
  async login(@Body() loginDto: LoginDto) {
    const jwtToken = await this.loginService.verify(loginDto);
    return { jwtToken };
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt'); // Since'jwt' is the name of the authentication cookie
    return res.status(HttpStatus.OK).send();
  }

}