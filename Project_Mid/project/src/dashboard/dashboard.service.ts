import { Injectable, BadRequestException } from '@nestjs/common';
import { Login } from '../auth/entities/login.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async resetPassword(uname: string, oldPass: string, newPass: string, confPass: string): Promise<void> {

    if (newPass !== confPass) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const user = await this.loginRepository.findOne({ where: { uname: uname } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await bcrypt.compare(oldPass, user.pass);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid old password');
    }

    const hashedNewPassword = await bcrypt.hash(newPass, 10);
    await this.loginRepository.update({ uname }, { pass: hashedNewPassword });
  }
}