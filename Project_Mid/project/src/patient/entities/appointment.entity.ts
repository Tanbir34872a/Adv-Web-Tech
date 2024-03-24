import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { Employee } from '../../employee/entities/employee.entity'; // Import Employee entity
import { time } from 'console';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  app_id: number;

  @ManyToOne(() => Patient, patient => patient.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Employee) // Assume doctor is an employee
  @JoinColumn({ name: 'assigned_to' })
  doctor: Employee; // Assigned doctor for the appointment

  @Column( {type: "timestamp"} )
  time: string;

  @Column()
  status: string;

  // Add other appointment details as needed
}