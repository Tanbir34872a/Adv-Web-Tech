import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './jwt.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(JwtInterceptor)
  @Post('login')
  async login(@Body() body: { uname: string; pass: string }) {
    const { uname, pass } = body;
    const jwtToken = await this.authService.verify(uname, pass);
    return { jwtToken };
  }
}
