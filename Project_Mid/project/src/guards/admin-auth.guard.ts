// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt']; // Get JWT token from request cookies

    if (!token) {
      return false; // Redirect if JWT token is not present
    }

    try {
      const decodedToken = this.jwtService.verify(token); // Verify JWT token
      const utype = decodedToken.utype; // Get utype from decoded token
      // Check if utype is admin
      if (utype === 'admin') {
        return true; // Allow access for admin
      }
    } catch (error) {
      return false; // Redirect if JWT token is invalid
    }

    return false; // Redirect if utype is not admin
  }
}
