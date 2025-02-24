import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GrindingTypesDBService } from './grindingTypes-db.service';

@Controller('grindingTypes')
export class GrindingTypesController {
  constructor(private readonly grindingTypesService: GrindingTypesDBService) {}
  @Get()
  async getGrindingTypesHandler(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const grindingTypes = await this.grindingTypesService.getGrindingTypes();
    reply.send(grindingTypes);
  }
}
