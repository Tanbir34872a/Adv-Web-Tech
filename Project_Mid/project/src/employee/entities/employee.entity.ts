import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  uname: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;

  @Column()
  role: string;

  @Column({ type: 'bytea', nullable: true }) // 'bytea' type for storing binary data (image)
  profilePicture: Buffer; // This will store the image data as a buffer
}
