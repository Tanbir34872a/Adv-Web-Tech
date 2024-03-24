import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  uname: string;

  @Column()
  name: string;

  @Column( {unique: true} )
  email: string;

  @Column( {unique: true} )
  phone: string;

  @Column()
  address: string;

  @Column()
  role: string;
}