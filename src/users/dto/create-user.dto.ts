import { IsEmail, IsIn, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  userName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsPhoneNumber('EG')
  phone: string;
  @IsStrongPassword({minSymbols:1})
  password: string;
  @IsString()
  @IsIn(['admin', 'user'])
  role: string;
}
