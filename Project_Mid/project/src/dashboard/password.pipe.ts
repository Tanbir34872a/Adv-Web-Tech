import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidPassword(value)) {
      throw new BadRequestException('Invalid password');
    }
    return value;
  }

  private isValidPassword(value: any): boolean {
    if (typeof value !== 'string' || value.length < 8 || value.length > 20) {
      return false;
    }

    // Password must contain at least one uppercase, one lowercase, one digit, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharacterRegex = /[@$!%*?&]/;
    if (!uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value) || !specialCharacterRegex.test(value)) {
      return false;
    }

    return true;
  }
}
