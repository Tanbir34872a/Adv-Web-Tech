import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'meow', // Secret key used to sign JWT tokens
    }),
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
  ],
})
export class DashboardModule {}
