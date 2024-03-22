import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity'; // Import the Login entity
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Login])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}