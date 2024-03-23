import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    private readonly jwtService: JwtService,
  ) {}

  async verify(uname: string, pass: string): Promise<string> {
    const user = await this.loginRepository.findOne({ where: { uname } });

    if (!user || !compareSync(pass, user.pass)) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    const payload = { uname: user.uname, utype: user.utype };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
