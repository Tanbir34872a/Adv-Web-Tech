import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './dummy.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('dummy')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint to create a new user
  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }
}