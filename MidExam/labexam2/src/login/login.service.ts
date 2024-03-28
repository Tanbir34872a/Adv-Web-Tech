import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly jwtService: JwtService, // Inject JwtService
      ) {}
    
      async verify(loginDto: LoginDto): Promise<string> {
        const {email, password} = loginDto;
        const user = await this.employeeRepository.findOne({ where: { email } });
    
        if (!user || password != user.password) {
          throw new UnauthorizedException('Invalid Username or Password');
        }
    
        // Generate JWT token
        const payload = { user_name: user.user_name, user_type: user.user_type };
        return this.jwtService.sign(payload);
      }
    }
