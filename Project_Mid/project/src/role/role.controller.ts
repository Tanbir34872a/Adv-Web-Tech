import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async createRole(@Body('roleName') roleName: string) {
    return this.rolesService.createRole(roleName);
  }

  @Put(':id')
  async updateFeatures(@Param('id') roleName: string, @Body() features: RoleDto) {
    return this.rolesService.updateFeatures(roleName, features);
  }

  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get('with-feature/:featureName')
  async getRolesWithFeature(@Param('featureName') featureName: string) {
    return this.rolesService.getRolesWithFeature(featureName);
  }
}