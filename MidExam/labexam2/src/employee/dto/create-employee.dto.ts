export class CreateEmployeeDto {
  full_name: string;
  email: string;
  city: string;
  country: string;
  company_name: string;
  password: string;
  confirm_password: string;
  phone: string;
  date_added: Date = new Date();
}
