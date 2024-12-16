import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('grindingTypes')
export class GrindingTypesController {
  @Get()
  async getGrindingTypesHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    return;
  }
}
