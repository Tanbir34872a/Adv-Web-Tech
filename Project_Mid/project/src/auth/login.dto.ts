import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly uname: string;

  @IsString()
  readonly pass: string;
}