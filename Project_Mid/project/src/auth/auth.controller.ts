import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async find(@Body() body: { uname: string; pass: string }) {
    const { uname, pass } = body;
    const token = await this.authService.verify(uname, pass);
    return { access_token: token };
  }
}
