import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(
    req: FastifyRequest['raw'],
    reply: FastifyReply['raw'],
    next: () => void
  ) {}
}
