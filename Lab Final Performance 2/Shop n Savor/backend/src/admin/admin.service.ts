import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = hashSync(createAdminDto.pass, 10);
    const admin = this.adminRepository.create({
      ...createAdminDto,
      pass: hashedPassword,
    });
    return await this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async findOne(uname: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { uname } });
    if (!admin) {
      throw new NotFoundException(`Admin with username ${uname} not found`);
    }
    return admin;
  }

  async update(uname: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const existingAdmin = await this.findOne(uname);
    const hashedPassword = updateAdminDto.pass ? hashSync(updateAdminDto.pass, 10) : undefined;
    
    const updatedAdmin = {
      ...existingAdmin,
      ...updateAdminDto,
      pass: hashedPassword || existingAdmin.pass, // If password is provided in the DTO, hash it, otherwise keep the existing hashed password
    };

    return await this.adminRepository.save(updatedAdmin);
  }

  async remove(uname: string): Promise<void> {
    const admin = await this.findOne(uname);
    await this.adminRepository.remove(admin);
  }
}
