import { Injectable,  NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Transaction } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Login } from '../auth/entities/login.entity';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Generate uname from role
    const role = createEmployeeDto.role;
    const uname = `${role.charAt(0).toLowerCase()}${await this.getNextNumber(role)}`;

    // Default password
    const password = 'Password123';
    const hashedPassword = hashSync(password, 10);

    const utype = createEmployeeDto.utype;

    // Create Login entity
    const login = this.loginRepository.create({ uname, pass: hashedPassword, utype });

    try {
      // Create Employee entity
      const employee = this.employeeRepository.create({ ...createEmployeeDto, uname });

      // Save employee entity
      const savedEmployee = await this.employeeRepository.save(employee);

      // Save login entity only if employee creation was successful
      await this.loginRepository.save(login);

      return savedEmployee;
    } catch (error) {
      // Rollback login creation if employee creation fails
      await this.loginRepository.remove(login);
      throw error;
    }
  }

  // Helper method to get the next number for a given role
  private async getNextNumber(role: string): Promise<number> {
    // Find the highest number associated with the role
    const maxNumberEmployee = await this.employeeRepository
      .createQueryBuilder('employee')
      .select('MAX(CAST(SUBSTRING(employee.uname, 2) AS INTEGER))', 'maxNumber')
      .where('SUBSTRING(employee.uname, 1, 1) = :role', { role: role.charAt(0).toLowerCase() })
      .getRawOne();

    const maxNumberLogin = await this.loginRepository
      .createQueryBuilder('login')
      .select('MAX(CAST(SUBSTRING(login.uname, 2) AS INTEGER))', 'maxNumber')
      .where('SUBSTRING(login.uname, 1, 1) = :role', { role: role.charAt(0).toLowerCase() })
      .getRawOne();

    // Get the maximum of the two numbers
    const maxNumber = Math.max(
      maxNumberEmployee?.maxNumber || 0, // Default to 0 if no employee found
      maxNumberLogin?.maxNumber || 0, // Default to 0 if no login found
    );

    // Increment the maximum number by one
    return maxNumber + 1;
  }


  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findPartialMatch(data: string): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: [
        { name: Like(`%${data}%`) }, // Partial match for name
        { email: Like(`%${data}%`) }, // Partial match for email
        { phone: Like(`%${data}%`) }, // Partial match for phone
        { address: Like(`%${data}%`) }, // Partial match for address
        { role: Like(`%${data}%`) }, // Partial match for role
      ],
    });
  }


  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { uname:id } });
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }

    // Update employee properties individually
    if (updateEmployeeDto.name) {
      employee.name = updateEmployeeDto.name;
    }
    if (updateEmployeeDto.email) {
      employee.email = updateEmployeeDto.email;
    }
    if (updateEmployeeDto.phone) {
      employee.phone = updateEmployeeDto.phone;
    }
    if (updateEmployeeDto.address) {
      employee.address = updateEmployeeDto.address;
    }
    if (updateEmployeeDto.role) {
      employee.role = updateEmployeeDto.role;
    }

    // Save the updated employee object to the database
    return this.employeeRepository.save(employee);
  }
  
  async remove(id: string, employeeRepository?: Repository<Employee>, 
    loginRepository?: Repository<Login>): Promise<void> {
    // Use injected transaction repositories or fallback to the default repositories
    const employeeRepo = employeeRepository || this.employeeRepository;
    const loginRepo = loginRepository || this.loginRepository;

    // Find the employee to be removed
    const employee = await employeeRepo.findOne({where: {uname: id}});
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    // Remove the employee record
    await employeeRepo.remove(employee);

    // Also remove the corresponding login record
    const login = await loginRepo.findOne({ where: {uname: id }});
    if (login) {
      await loginRepo.remove(login);
    }
  }
}
