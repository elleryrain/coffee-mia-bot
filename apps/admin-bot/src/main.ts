import fastify from 'fastify';
import { BOT_CONFIG } from './config/env.config';

(async () => {
  const app = fastify({ logger: true });
  app.listen({ port: Number(BOT_CONFIG.port) });
  console.log('[ADMIN BOT] started');
})();
