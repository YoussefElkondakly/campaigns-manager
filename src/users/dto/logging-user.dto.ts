import { IsEmail, IsIn, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class LoggingUserDto {
  
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
;
}
