import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  async verify(uname: string, pass: string): Promise<string> {
    const user = await this.loginRepository.findOne({ where: { uname } });

    if (!user || !compareSync(pass, user.pass)) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    // Generate JWT token
    const payload = { uname: user.uname, utype: user.utype };
    return this.jwtService.sign(payload);
  }
}