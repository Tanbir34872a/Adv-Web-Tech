import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Admin } from 'src/admin/entities/admin.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: 'meow',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Admin, Customer])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
