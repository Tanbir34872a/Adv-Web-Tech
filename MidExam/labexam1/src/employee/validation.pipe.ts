import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const { email, phone, password } = value;
    const errors = [];
    if (phone && !/^0\d{10}$/.test(phone)) {
      errors.push('Phone number must be 11 digits long and start with 0');
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.push('Email must be a valid email');
    }
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      errors.push('Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character');
    }
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
