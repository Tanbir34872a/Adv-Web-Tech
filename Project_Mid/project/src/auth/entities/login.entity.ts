import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Login {
  @PrimaryColumn()
  uname: string;

  @Column()
  pass: string;
}