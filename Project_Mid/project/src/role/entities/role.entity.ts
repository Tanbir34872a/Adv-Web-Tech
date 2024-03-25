import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn({ unique: true })
  roleName: string;

  @Column({ default: false })
  feature1: boolean;

  @Column({ default: false })
  feature2: boolean;

  constructor(roleName: string) {
    this.roleName = roleName;
  }
}