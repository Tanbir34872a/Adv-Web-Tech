import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/admin')
  async adminLogin(@Body() LoginDto: LoginDto) {
    const token = await this.authService.loginAdmin(LoginDto);
    return { token };
  }

  @Post('/customer')
  async customerLogin(@Body() LoginDto: LoginDto) {
    const token = await this.authService.loginCustomer(LoginDto);
    return { token };
  }
}
