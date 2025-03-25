import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { PortConfigService } from './config/port.config';

async function bootstrap() {
  const CORS_OPTIONS = {
    origin: ['*'], // or '*' or whatever is required
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
      'X-Telegram-Auth',
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  };
  const appAdapter = new FastifyAdapter();
  appAdapter.enableCors(CORS_OPTIONS);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    appAdapter
  );
  // app.use();
  const globalPrefix = 'api';
  const portConfigService = app.get(PortConfigService);

  const port = portConfigService.getBackendPort();
  app.setGlobalPrefix(globalPrefix);
  await app.listen({ port: port, host: '0.0.0.0' });
  Logger.log(
    `Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
