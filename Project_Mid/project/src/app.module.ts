import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DummyModule } from './dummy/dummy.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from './employee/employee.module';
import { PatientModule } from './patient/patient.module';
import { NotificationModule } from './notifications/notifications.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1234567890',
      username: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'HMS',
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({
      secret: 'meow', // Secret key used to sign JWT tokens
    }),
    AuthModule,
    DummyModule,
    DashboardModule,
    EmployeeModule,
    PatientModule,
    NotificationModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
