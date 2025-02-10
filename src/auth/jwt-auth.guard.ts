import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return super.canActivate(context) as boolean;
  }
 
  handleRequest(err: any, user: any, info: any) {
    // ✅ Handle expired token error
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token has expired, please login again.');
    }

    // ✅ Handle invalid token error
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token, please login again.');
    }

    // ✅ Handle missing user (token invalid)
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized access.');
    }

    return user;
  }
}
