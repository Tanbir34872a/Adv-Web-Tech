import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Login } from './entities/login.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]),
    JwtModule.register({
      secret: 'your-secret-key', // Set your own secret key here
      signOptions: { expiresIn: '1h' }, // Set expiration time as needed
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
