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
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import path from 'node:path';

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
  await app.register(swagger, {
    mode: 'static',
    // prefix: 'docs',

    specification: {
      baseDir: '',
      path: swaggerPath,
    },
    // exposeRoutes: true,
  });
  await app.register(swaggerUI, {
    routePrefix: '/api/docs',
  });
  app.setGlobalPrefix(globalPrefix);
  const port = Number(process.env.PORT) || 3000;
  await app.listen({ port: port, host: '0.0.0.0' });
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
