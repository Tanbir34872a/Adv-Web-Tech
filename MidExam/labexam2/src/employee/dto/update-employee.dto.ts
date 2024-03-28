import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  last_updated: Date = new Date(); // Current date as in when was it updated (kept it just to date as per request but the time would be better)
}

