import { Module } from '@nestjs/common';
import { ItemModule } from '../item/item.module';
import { DatabaseModule } from '../db/db.module';
import { GrindingTypesModule } from '../grindingTypes/grindingTypes.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PortConfigService } from '../config/port.config';
@Module({
  imports: [
    ItemModule,
    GrindingTypesModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PortConfigService],
})
export class AppModule {}
