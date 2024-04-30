import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/entities/admin.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './login.dto';
import { compareSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async loginAdmin(loginDto: LoginDto): Promise<string> {
    const { uname, pass } = loginDto;
    const admin = await this.adminRepository.findOne({ where: { uname } });
    if (!admin || !compareSync(pass, admin.pass)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(admin.uname, 'admin');
    return token;
  }

  async loginCustomer(loginDto: LoginDto): Promise<string> {
    // const { uname, pass } = loginDto;
    // const customer = await this.customerRepository.findOne({ where: { uname } });
    // if (!customer || !compareSync(pass, customer.pass)) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    // const token = this.generateToken(customer.uname, 'customer');
    // return token;
    return "Not ready yet";
  }

  private generateToken(uname: string, utype: string): string {
    return this.jwtService.sign({ uname, utype });
  }
}
