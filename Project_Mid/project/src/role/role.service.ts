import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(roleName: string): Promise<Role> {
    const role = new Role(roleName);
    return this.roleRepository.save(role);
  }

  async updateFeatures(roleName: string, features: RoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({where:{roleName}});
    if (!role) {
      throw new Error('Role not found');
    }
    if (features.feature1 !== undefined) {
      role.feature1 = features.feature1;
    }
    if (features.feature2 !== undefined) {
        role.feature2 = features.feature2;
    }
    return await this.roleRepository.save(role);
  }

  async getAllRoles() {
    return this.roleRepository.find();
  }

  async getRolesWithFeature(featureName: string): Promise<Role[]> {
    // Retrieve roles where the specified feature is set to true
    return this.roleRepository.find({
      where: {
        [featureName]: true,
      },
    });
  }
}