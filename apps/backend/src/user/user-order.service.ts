import { Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import {
  grainItemVarsTable,
  grindingTypesTables,
  itemCostsTable,
  itemsTable,
  itemsToChaptersTable,
  orderItemsTable,
  ordersTable,
} from '../drizzle/schemas/schema';
import { TBodyOrderItem } from './dto/order';
import { eq, inArray, sql } from 'drizzle-orm';

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
        itemId: itemsTable.id,
        title: itemsTable.title,
        mainImage: itemsTable.mainImage,
        cost: sql`COALESCE(${grainItemVarsTable.cost}, ${itemCostsTable.cost})`.as(
          'cost'
        ),
        weight: grainItemVarsTable.weight,
        grindingType: grindingTypesTables.title,
      })
      .from(itemsTable)
      .innerJoin(orderItemsTable, eq(itemsTable.id, orderItemsTable.itemId))
      .innerJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id))
      .innerJoin(itemCostsTable, eq(itemsTable.id, itemCostsTable.itemId))
      .leftJoin(
        grainItemVarsTable,
        eq(orderItemsTable.grainItemVarId, grainItemVarsTable.id)
      )
      .leftJoin(
        grindingTypesTables,
        eq(orderItemsTable.grindingTypeItemId, grindingTypesTables.id)
      )
      .where(eq(ordersTable.userId, userId))
      .execute();

    return result.map((row) => ({
      id: row.itemId,
      image: row.mainImage,
      name: row.title,
      weight: row.weight, // null для незерновых товаров
      cost: row.cost, // всегда число благодаря COALESCE
      grindingType: row.grindingType ?? '', // пустая строка, если null
    }));
  }
}
