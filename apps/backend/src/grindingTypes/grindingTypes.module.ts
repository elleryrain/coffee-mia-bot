import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { GrindingTypesDB } from './grindingTypes-db.service';
import { GrindingTypesController } from './grindingTypes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [GrindingTypesDB],
  controllers: [GrindingTypesController],
  exports: [],
})
export class GrindingTypesModule {}
