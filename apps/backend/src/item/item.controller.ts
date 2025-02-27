import { Controller, Get, Req, Res } from '@nestjs/common';
import { ItemServiceDB } from './item-db.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('item')
export class ItemController {
  constructor(private readonly itemServiceDB: ItemServiceDB) {}

  @Get()
  async getExtendedItemHandler(
    @Req()
    req: FastifyRequest<{
      Querystring: {
        idItem: string;
      };
    }>,
    @Res() reply: FastifyReply
  ) {
    const { idItem } = req.query;
    console.log(req.raw.user);
    if (!idItem) {
      return reply.code(204).send();
    }
    const numberItemId = Number(idItem);
    const item = await this.itemServiceDB.getExtendedItemById(numberItemId);
    return reply.send(item);
  }

  @Get('grain')
  async getGrainItemsHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    const userId = req['raw'].user.id;
    const items = await this.itemServiceDB.getGrainItem(userId);
    return reply.send(items);
  }

  @Get('dripPacks')
  async getDripPacksHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    const userId = req['raw'].user.id;
    const items = await this.itemServiceDB.getDripPacks(userId);
    return reply.send(items);
  }

  @Get('other')
  async getOtherItemsHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    const userId = req['raw'].user.id
    const items = await this.itemServiceDB.getOtherItems(userId);
    return reply.send(items);
  }
}
