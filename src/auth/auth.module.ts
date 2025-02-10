import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionService } from './encryption.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],inject:[ConfigService],useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>('SECRET')
        ,signOptions:{
          expiresIn:configService.get<string>('EXPIRES_IN')
        }
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptionService,JwtStrategy],
})
export class AuthModule {}
