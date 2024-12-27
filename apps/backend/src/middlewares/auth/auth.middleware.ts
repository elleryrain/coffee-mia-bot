import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'node:crypto';
import { botToken } from '../../config/env';
import { InitData, parse, validate } from '@telegram-apps/init-data-node';
import { setTgDataToReq } from '../../utils/setTgDataToReq';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(
    req: FastifyRequest['raw'],
    reply: FastifyReply['raw'],
    next: () => void
  ) {
    const authHeader = req.headers['x-telegram-auth'] as string;

    if (!authHeader) {
      return reply.writeHead(403).end('auth header not found');
    }

    const [authType, authData = ''] = authHeader.split(' ');
    console.log(`[AUTH TYPE]`, authType);
    console.log(`[AUTH DATA]`, authData);
    try {
      validate(authData, botToken, { expiresIn: 3600 });
      const data = parse(authData);
      setTgDataToReq(req, data);
      next();
    } catch (e) {
      console.log(e);
      return reply.writeHead(403).end('auth failed');
    }
  }
}
