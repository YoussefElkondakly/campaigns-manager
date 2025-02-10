import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClassValidatorErrorInterceptor } from './interceptors/class-validator-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new RolesGuard());
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ClassValidatorErrorInterceptor())
  await app.listen(process.env.HF ?? 3000);
}
bootstrap();
