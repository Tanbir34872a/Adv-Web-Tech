import { Controller, UseGuards,  Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeeService } from './employee.service';
import { RoleGuard } from '../guards/admin-auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Buffer } from 'buffer';

@Controller('employee')
//@UseGuards(RoleGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture')) // Intercept the 'profilePicture' file upload
  create(@Body() createEmployeeDto: CreateEmployeeDto, @UploadedFile() profilePicture: Buffer) {
    return this.employeeService.createEmployee(createEmployeeDto, profilePicture);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') search: string) {
    return this.employeeService.findPartialMatch(search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
