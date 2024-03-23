import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data && data.jwtToken) {
          const response = context.switchToHttp().getResponse<Response>();
          response.cookie('jwt', data.jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          });
        }
      }),
    );
  }
}