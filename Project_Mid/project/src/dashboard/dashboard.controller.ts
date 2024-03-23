import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/admin-auth.guard'; // Import AuthGuard

@Controller('dashboard')
@UseGuards(RoleGuard) // Apply RoleGuard to all routes in this controller
export class DashboardController {
  @Get()
  getDashboard() {
    console.log("Welcome to HMS");
    // Logic to render dashboard page
  }
}
