import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '../db/db.module';
import { UserServiceDB } from './user-db.service';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';
import { UserOrderService } from './user-order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  exports: [],
  providers: [UserServiceDB, UserOrderService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
