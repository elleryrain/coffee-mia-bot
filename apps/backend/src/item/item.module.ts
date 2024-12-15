import { Module } from '@nestjs/common';
import { ItemServiceDB } from './item-db.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [ItemServiceDB],
  controllers: [ItemController],
  exports: [],
})
export class ItemModule {}
