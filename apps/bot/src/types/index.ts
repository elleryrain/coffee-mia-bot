import { Api, Bot, Context, RawApi } from 'grammy';

declare module 'fastify' {
  interface FastifyInstance {
    bot: Bot<Context, Api<RawApi>>;
  }
}
