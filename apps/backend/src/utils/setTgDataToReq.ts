import { InitData } from '@telegram-apps/init-data-node';
import { FastifyRequest } from 'fastify';
import { IncomingMessage } from 'http';

export function setTgDataToReq(
  req: IncomingMessage,
  data: InitData
): null | 'user data not found' {
  if (!data.user) {
    throw new Error('auth user data not found');
  }

  req.user = {
    id: data.user.id,
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    username: data.user.username,
  };
  return null;
}
