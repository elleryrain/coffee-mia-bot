import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ItemServiceDB } from './item-db.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from '../db/db.module';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [ItemServiceDB],
  controllers: [ItemController],
  exports: [],
})
export class ItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ItemController);
  }
}
