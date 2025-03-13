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
    // await this.db.transaction(async (tx) => {
    //   const dbItems = await tx
    //     .select()
    //     .from(itemsTable)
    //     .leftJoin(
    //       itemsToChaptersTable,
    //       eq(itemsTable.id, itemsToChaptersTable.itemId)
    //     )
    //     .where(inArray(itemsTable.id, itemsIdArray));
    //   console.log(dbItems);
    // });
    console.log(1);
    const order = (
      await this.db
        .insert(ordersTable)
        .values({ userId, deliveryType: 'CDEK' })
        .returning({ id: ordersTable.id })
    )[0];
    console.log(123, order);
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
  async getUserOrderedItems(userId: number) {
    const result = await this.db
      .select({
        item: itemsTable,
      })
      .from(itemsTable)
      .innerJoin(orderItemsTable, eq(itemsTable.id, orderItemsTable.itemId))
      .innerJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id))
      .where(eq(ordersTable.userId, userId))
      .execute();

    return result.map((row) => ({
      id: row.item.id,
      image: row.item.mainImage,
      name: row.item.title,
      weight: 500,
      cost: 500,
      grindingType: '',
    }));
  }
}
