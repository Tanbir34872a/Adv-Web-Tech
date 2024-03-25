import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsOptional()
  towardsDoctorId: string; // Optional

  @IsNotEmpty()
  @IsString()
  review: string;
}