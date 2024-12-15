import { Controller, Get, Req, Res } from '@nestjs/common';
import { ItemServiceDB } from './item-db.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('item')
export class ItemController {
  constructor(private readonly itemServiceDB: ItemServiceDB) {}
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
