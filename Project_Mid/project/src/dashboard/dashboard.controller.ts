import { Controller, Get, UseGuards, Post, Req, Body } from '@nestjs/common';
import { RoleGuard } from '../guards/admin-auth.guard'; // Import RoleGuard [Admin]
import { Request } from 'express';
import { PasswordValidationPipe } from './password.pipe'; // Import the PasswordValidationPipe
import { JwtService } from '@nestjs/jwt';
import { DashboardService } from './dashboard.service';
import { ResetPassDto } from './reset-pass.dto';

@Controller('dashboard')
@UseGuards(RoleGuard) // Apply RoleGuard to all routes in this controller
export class DashboardController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dashboardService: DashboardService
  ) {}

  @Get()
  getDashboard() {
    return "Welcome to HMS";
  }

  @Post('reset-pass')
  async changePassword(
    @Req() req: Request, 
    @Body('newPass', PasswordValidationPipe) newPass: string, // Apply PasswordValidationPipe to newPass
    @Body() resetpassdto: ResetPassDto, // Add the entire DTO to get other fields
  ): Promise<string> {
    const decodedToken = this.jwtService.verify(req.cookies['jwt']); // Verify JWT token
    const uname = decodedToken.uname; // Get uname from decoded token

    const { oldPass, confPass } = resetpassdto;

    await this.dashboardService.resetPassword(uname, oldPass, newPass, confPass);

    return "Password Changed";
  }
}
