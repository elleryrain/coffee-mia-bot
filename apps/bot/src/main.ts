import fastify from 'fastify';
import { BOT_CONFIG } from './config/env.config';
import { setupBot } from './bot/grammy';
import { setupRoutes } from './routes';

(async () => {
  const app = fastify({ logger: true });
  const bot = await setupBot();
  app.decorate('bot', bot);

  setupRoutes(app);
  await app.listen({ port: Number(BOT_CONFIG.port) });
  console.log('[CLIENT BOT] started');
  await app.bot.start();
})();
