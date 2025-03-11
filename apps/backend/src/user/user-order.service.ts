import { Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import {
  itemsTable,
  itemsToChaptersTable,
  orderItemsTable,
  ordersTable,
} from '../drizzle/schemas/schema';
import { TBodyOrderItem } from './dto/order';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class UserOrderService {
  constructor(@Inject('DB') private db: DrizzlePg) {}
  async orderItems(userId: number, itemsArray: TBodyOrderItem[]) {
    const itemsIdArray = itemsArray.map((item) => item.itemId);
    await this.db.transaction(async (tx) => {
      const dbItems = await tx
        .select()
        .from(itemsTable)
        .leftJoin(
          itemsToChaptersTable,
          eq(itemsTable.id, itemsToChaptersTable.itemId)
        )
        .where(inArray(itemsTable.id, itemsIdArray));
      console.log(dbItems);
    });
    const order = (
      await this.db
        .insert(ordersTable)
        .values({ userId })
        .returning({ id: ordersTable.id })
    )[0];
    const itemsToOrder = itemsArray.map((item) => ({
      itemId: item.itemId,
      grindingTypeItemId: item.grindingTypeId,
      grainItemVarId: item.itemVarId,
      orderId: order.id,
    }));
    const items = await this.db
      .insert(orderItemsTable)
      .values(itemsToOrder)
      .returning();
    return items;
  }
}
