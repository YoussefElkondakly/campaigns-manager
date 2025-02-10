import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles, ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const roles=this.reflector.get<string[]>(ROLES_KEY,context.getHandler())
    if(!roles)return true;
    const request=context.switchToHttp().getRequest();
    const user=request.user;

    if (!user || !user.role) {
      throw new UnauthorizedException(
        'User not found or role missing in request',
      );
    }
    const match= roles.includes(user.role)

  if(!match)throw new UnauthorizedException("You Don't have Access to this route")

  return match
  }

}
