import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  uname: string;

  @Column()
  pass: string;

  @Column()
  name: string;

  @Column( {unique: true} )
  email: string;

  @Column( {unique: true} )
  phone: string;

  @Column()
  address: string;
}