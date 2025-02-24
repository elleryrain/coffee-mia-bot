import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { backendPort } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  await app.listen({ port: backendPort, host: '0.0.0.0' });
  Logger.log(
    `Application is running on: http://localhost:${backendPort}/${globalPrefix}`
  );
}

bootstrap();
