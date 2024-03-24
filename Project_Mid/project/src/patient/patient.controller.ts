import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AppointmentDto } from './dto/appointment.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get()
  findAllPatient() {
    return this.patientService.findAllPatient();
  }

  @Get(':id')
  findPartialMatch(@Param('id') id: string) {
    return this.patientService.findPartialMatch(id);
  }

  @Patch(':id')
  updatePatient(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updatePatient(+id, updatePatientDto);
  }

  @Delete(':id')
  removePatient(@Param('id') id: string) {
    return this.patientService.removePatient(+id);
  }

  @Post(':id/appointments')
  createAppointment(@Param('id') id: string, @Body() appointmentDto: AppointmentDto) {
    return this.patientService.createAppointment(+id, appointmentDto);
  }

  @Get(':id/appointments')
  getAppointments(@Param('id') id: string) {
    return this.patientService.getAppointments(+id);
  }

  @Patch('appointments/:appointmentId')
  updateAppointment(@Param('appointmentId') appointmentId: string, @Body() appointmentDto: AppointmentDto) {
    return this.patientService.updateAppointment(+appointmentId, appointmentDto);
  }

  @Delete('appointments/:appointmentId')
  deleteAppointment(@Param('appointmentId') appointmentId: string) {
    return this.patientService.deleteAppointment(+appointmentId);
  }
}
