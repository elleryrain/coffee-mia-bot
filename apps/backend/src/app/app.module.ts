import { Module } from '@nestjs/common';
import { ItemModule } from '../item/item.module';
import { DatabaseModule } from '../db/db.module';
import { GrindingTypesModule } from '../grindingTypes/grindingTypes.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ItemModule, GrindingTypesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
