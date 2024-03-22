import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { AuthService } from './dummy.service';
import { AuthController } from './dummy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Login])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class DummyModule {}