import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column( {unique: true, nullable: true} ) //can make this primary too if you feel like it
  user_name: string;

  @Column( {unique: true} ) //this too
  email: string;

  @Column()
  password: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  company_name: string;

  @Column( {nullable: true} )
  user_type: string;

  @Column({ type: 'timestamp' })
  date_added: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_updated: Date;
}