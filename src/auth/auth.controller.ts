import { AuthService } from 'src/auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoggingUserDto } from 'src/users/dto/logging-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() loggingUserDto: LoggingUserDto): Promise<any> {
    return this.authService.login(loggingUserDto);
  }
}
