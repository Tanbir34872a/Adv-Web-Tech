import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { full_name, email, city, country, company_name, password, confirm_password, phone } = value;
    const errors = [];

    // Full name validation
    if (!full_name || typeof full_name !== 'string' || !/^[A-Za-z ]{3,30}$/.test(full_name)) {
      errors.push('Full name must be alphabetic and between 3 to 30 characters');
    }

    // Email validation
    if (!email || typeof email !== 'string' || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
      errors.push('Email must be a valid email address between 10 to 50 characters');
    }

    // City validation
    if (!city || typeof city !== 'string' || !/^.{3,20}$/.test(city)) {
      errors.push('City must be between 3 to 20 characters');
    }

    // Country validation
    if (!country || typeof country !== 'string' || !/^.{3,20}$/.test(country)) {
      errors.push('Country must be between 3 to 20 characters');
    }

    // Company name validation
    if (!company_name || typeof company_name !== 'string' || !/^.{3,20}$/.test(company_name)) {
      errors.push('Company name must be between 3 to 20 characters');
    }

    // Password validation
    if (!password || typeof password !== 'string' || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password)) {
      errors.push('Password must be alphanumeric and between 8 to 20 characters');
    }

    // Confirm password validation
    if (password !== confirm_password) {
      errors.push('Password and Confirm Password must match');
    }

    // Phone number validation
    if (!phone || typeof phone !== 'string' || !/^\d{11,15}$/.test(phone)) {
      errors.push('Phone number must be an integer with a length between 11 to 15 digits');
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }
}
