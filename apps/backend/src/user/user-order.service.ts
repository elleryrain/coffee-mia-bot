import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import {
  grainItemVarsTable,
  grindingTypesTables,
  itemCharacteristicsTables,
  itemCostsTable,
  itemsTable,
  itemsToChaptersTable,
  orderItemsTable,
  ordersTable,
} from '../drizzle/schemas/schema';
import { TBodyOrderItem } from './dto/order.dto';
import { eq, inArray, sql } from 'drizzle-orm';
import { OrderDelivery } from './types/order';

@Injectable()
export class UserOrderService {
  constructor(@Inject('DB') private db: DrizzlePg) {}
  async orderItems(
    userId: number,
    itemsArray: TBodyOrderItem[],
    delivery: OrderDelivery
  ) {
    // const itemsIdArray = itemsArray.map((item) => item.itemId);
    try {
      const res = await this.db.transaction(async (tx) => {
        let orderInfoCdek: null | {
          first_name?: string | undefined;
          last_name?: string | undefined;
          middle_name?: string | undefined;
          phone?: string | undefined;
          cdek_address?: string | undefined;
          deliveryType: 'CDEK';
        };
        let orderInfoCourier: null | {
          first_name?: string | undefined;
          telegram_nickname?: string | undefined;
          phone?: string | undefined;
          address?: string | undefined;
          date?: string | undefined;
          time?: string | undefined;
          comment?: string | undefined;
          deliveryType: string;
        };
        let order: undefined | { id: number } = undefined;
        if (delivery.typeDelivery === 'cdek') {
          orderInfoCdek = {
            deliveryType: 'CDEK',
            ...delivery.cdekDelivery,
          };
          order = (
            await tx
              .insert(ordersTable)
              .values({ userId, ...orderInfoCdek })
              .returning({ id: ordersTable.id })
          )[0];
        }

        if (delivery.typeDelivery === 'courier') {
          orderInfoCourier = {
            deliveryType: 'courier',
            ...delivery.courierDelidery,
          };
          order = (
            await tx
              .insert(ordersTable)
              .values({ userId, ...orderInfoCourier })
              .returning({ id: ordersTable.id })
          )[0];
        }
        if (!order) {
          throw new HttpException('order not created', 500);
        }
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
        console.log(items);
      });
    } catch (err) {
      console.log('Ошибка в транзакции', err);
      throw err;
    }
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
        idGrindingType: grindingTypesTables.id,
        idItemVar: grainItemVarsTable.id,
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
      weight: row.weight,
      cost: row.cost,
      grindingType: row.grindingType ?? '',
      idGrindingType: row.grindingType,
      idItemVar: row.idItemVar,
    }));
  }
}
