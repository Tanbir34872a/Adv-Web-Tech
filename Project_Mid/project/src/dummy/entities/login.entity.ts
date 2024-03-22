import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Login {
  @PrimaryColumn()
  uname: string;

  @Column()
  pass: string;

  @Column( {nullable: true} )
  utype: string;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.pass);
  }
}