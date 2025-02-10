import { LoggingUserDto } from './../users/dto/logging-user.dto';
import { EncryptionService } from './encryption.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}
  async register(createUserDto:CreateUserDto) {
    const hashedPassword=await this.encryptionService.hashPassword(createUserDto.password)
    const createdUser = await this.userService.create({...createUserDto,password:hashedPassword});
    return {
      message: 'User created successfully, please login.',
      user: createdUser,
    };
  }

  async validateUser(loggingUserDto:LoggingUserDto): Promise<any> {
    const user = await this.userService.findOne(loggingUserDto.email);
    const result=await this.encryptionService.comparePasswords(loggingUserDto.password,user.password)
    if (!result) throw new ForbiddenException('Email or Password are incorrect')

    return plainToInstance(UserDto,user);
  }

  async login(loggingUserDto: LoggingUserDto) {
    const user = await this.validateUser(loggingUserDto);
    const payload = { username: user.userName, sub: user.id,role:user.role };
    return {
      access_token: this.jwtService.sign(payload),
    }; 
  }

}
