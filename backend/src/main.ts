import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();