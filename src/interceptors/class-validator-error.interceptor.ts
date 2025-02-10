import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export class ClassValidatorErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException) {
          const response = error.getResponse();
          console.log(response);
          if (
            typeof response === 'object' &&
            response !== null &&
            'message' in response &&
            Array.isArray(response.message)
          ) {
            const formattedErrors: Record<string, string> = {};
            response.message.forEach((msg) => {
              const match = msg.match(/^(\w+) (.+)$/);
              if (match) {
                const field = match[1];
                const errorMessage = match[2];
                if (formattedErrors[field]) {
                  formattedErrors[field] += ` and ${errorMessage}`;
                } else {
                  formattedErrors[field] = errorMessage;
                }
              }
            });

            return throwError(() => new BadRequestException({
              statusCode: 400,
              error: 'Bad Request',
              messages: formattedErrors,
            }));
          }
          return throwError(() => error);
        }
   return throwError(() => error);

      }),
    );
  }
}
