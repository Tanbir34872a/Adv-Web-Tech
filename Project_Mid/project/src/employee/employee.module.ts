import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from '../auth/entities/login.entity';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { JwtModule } from '@nestjs/jwt';
import { ValidationMiddleware } from './create-employee-validation.middleware'; // Import the ValidationMiddleware

@Module({
  imports: [JwtModule.register({
    secret: 'meow', // Secret key used to sign JWT tokens
  }), 
  TypeOrmModule.forFeature([Login, Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'employee', method: RequestMethod.POST }, // Apply middleware to POST /employee route
        // Add other routes that need validation
      );
  }
}