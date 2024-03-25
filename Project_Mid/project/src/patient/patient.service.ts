import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOneOptions } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AppointmentDto } from './dto/appointment.dto';
import { Login } from '../auth/entities/login.entity'
import { hashSync } from 'bcryptjs';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    const savedPatient = await this.patientRepository.save(patient);

    const uname = savedPatient.patient_id.toString();
    // Default password
    const password = 'Password123';
    const hashedPassword = hashSync(password, 10);
    const utype = "patient";

    const login = this.loginRepository.create({uname, pass: hashedPassword, utype})
    await this.loginRepository.save(login);

    return savedPatient;
  }

  async findAllPatient(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findPartialMatch(data: string): Promise<Patient[]> {
    return this.patientRepository.find({
      where: [
        { name: Like(`%${data}%`) },
        { email: Like(`%${data}%`) },
        { phone: Like(`%${data}%`) },
      ],
    });
  }

  async updatePatient(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne({where: {patient_id: id}});
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }

    if (updatePatientDto.name) {
      patient.name = updatePatientDto.name;
    }
    if (updatePatientDto.email) {
      patient.email = updatePatientDto.email;
    }
    if (updatePatientDto.phone) {
      patient.phone = updatePatientDto.phone;
    }

    return this.patientRepository.save(patient);
  }

  async removePatient(id: number): Promise<void> {
    const patient = await this.patientRepository.findOne({where: {patient_id: id}});
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }

    await this.patientRepository.remove(patient);
  }

  async createAppointment(patientId: number, appointmentDto: AppointmentDto): Promise<Appointment> {
    const { doctor, ...rest } = appointmentDto;
    const appointment = this.appointmentRepository.create({
      ...rest,
      doctor: { uname: doctor }, // Update to use the doctor ID
      patient: { patient_id: patientId }, // Assuming patient_id is the foreign key column for patient ID
    });
    return this.appointmentRepository.save(appointment);
  }

  async updateAppointment(appointmentId: number, appointmentDto: AppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { app_id: appointmentId } });
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${appointmentId} not found`);
    }
  
    const { doctor, ...rest } = appointmentDto;
    appointment.time = rest.time;
    appointment.status = rest.status;
  
    return this.appointmentRepository.save(appointment);
  }

  async getAppointments(patientId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: { patient: { patient_id: patientId } } });
  }


  async deleteAppointment(appointmentId: number): Promise<void> {
    const appointment = await this.appointmentRepository.findOne({where: {app_id: appointmentId}});
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${appointmentId} not found`);
    }

    await this.appointmentRepository.remove(appointment);
  }
}
