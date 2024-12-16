import { Module } from '@nestjs/common';
import { ItemModule } from '../item/item.module';
import { DatabaseModule } from '../db/db.module';
import { GrindingTypesModule } from '../grindingTypes/grindingTypes.module';

@Module({
  imports: [ItemModule, GrindingTypesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
