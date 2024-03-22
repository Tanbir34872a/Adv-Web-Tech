import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    // Hash the password
    const hashedPassword = hashSync(createUserDto.pass, 10);

    // Create a new user entity
    const newUser = this.loginRepository.create({
      uname: createUserDto.uname,
      pass: hashedPassword,
      utype: createUserDto.utype,
    });

    // Save the new user to the database
    await this.loginRepository.save(newUser);

    return { message: 'User created successfully' };
  }
}