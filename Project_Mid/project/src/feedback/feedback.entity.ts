import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  feed_id: number;

  @Column()
  from: string; // Assuming 'from' represents the patient

  @ManyToOne(() => Employee, { nullable: true }) // Many-to-one relationship with Doctor
  @JoinColumn({ name: 'doctor_id' })
  towardsDoctor: Employee; // Can be null if feedback is not towards a doctor

  @Column()
  review: string;
}
