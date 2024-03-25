import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { CreatePatientValidationMiddleware } from './create-patient-validation.middleware'; 
import { Login } from '../auth/entities/login.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Appointment, Login])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreatePatientValidationMiddleware)
      .forRoutes(
        { path: 'patient', method: RequestMethod.POST },
      );
  }
}
