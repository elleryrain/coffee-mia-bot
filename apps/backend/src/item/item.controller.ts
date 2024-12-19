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
    if(!idItem) {
      return reply.code(403).send({message: 'id item not found'})
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
    const items = await this.itemServiceDB.getGrainItem();
    return reply.send(items);
  }

  @Get('dripPacks')
  async getDripPacksHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    const items = await this.itemServiceDB.getDripPacks();
    return reply.send(items);
  }

  @Get('other')
  async getOtherItemsHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    const items = await this.itemServiceDB.getOtherItems();
    return reply.send(items);
  }
}
