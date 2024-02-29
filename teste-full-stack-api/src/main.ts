import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './_helpers/transform.interceptores';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { RegionalService } from './_services/regional.service';
import { SpecialtyService } from './_services/specialty.services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));

  const regionalService = app.get(RegionalService);
  await regionalService.seed();

  const specialtyService = app.get(SpecialtyService);
  await specialtyService.seed();

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
