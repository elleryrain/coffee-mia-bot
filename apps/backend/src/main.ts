/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import swaggerUI from '@fastify/swagger-ui';
import path from 'node:path';
import { backendPort } from './config/env';

const swaggerPath = path.join(
  __dirname,
  '../../../apps/',
  'shared/',
  'swagger/',
  'swagger.json'
);
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const globalPrefix = 'api';
  await app.register(require('@fastify/cors'));
  await app.register(require('@fastify/swagger'), {
    mode: 'static',
    // prefix: 'docs',

    specification: {
      baseDir: '',
      path: swaggerPath,
    },
    // exposeRoutes: true,
  });

  await app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/api/docs',
  });

  app.setGlobalPrefix(globalPrefix);
  await app.listen({ port: backendPort, host: '0.0.0.0' });
  Logger.log(
    `🚀 Application is running on: http://localhost:${backendPort}/${globalPrefix}`
  );
}

bootstrap();
