import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { GrindingTypesDBService } from './grindingTypes-db.service';
import { GrindingTypesController } from './grindingTypes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [GrindingTypesDBService],
  controllers: [GrindingTypesController],
  exports: [],
})
export class GrindingTypesModule {}
