import { MailService } from './../mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoggingUserDto } from 'src/users/dto/logging-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const email=await this.mailService.verifyEmail(createUserDto.email)
    console.log(email)
    if(!email){
      throw new NotFoundException("Email doesn't exist")
    }
    return this.authService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() loggingUserDto: LoggingUserDto): Promise<any> {
    return this.authService.login(loggingUserDto);
  }
}
