import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
//@UseGuards(RoleGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    try {
      await this.adminService.create(createAdminDto);
      return 'Account Created Successfully';
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create account', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.adminService.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve admin list', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.adminService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Admin not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    try {
      await this.adminService.update(id, updateAdminDto);
      return 'Account Updated Successfully';
    } catch (error) {
      throw new HttpException(error.message || 'Failed to update account', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.adminService.remove(id);
      return 'Account Deleted Successfully';
    } catch (error) {
      throw new HttpException(error.message || 'Failed to delete account', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
