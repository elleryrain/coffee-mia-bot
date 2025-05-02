import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DrizzlePg } from '../db/db.module';
import {
  grainItemVarsTable,
  grindingTypesTables,
  itemCostsTable,
  itemsTable,
  orderItemsTable,
  ordersTable,
} from '../drizzle/schemas/schema';
import {
  TBodyOrderItem,
  TCdekDelivery,
  TCourierDelivery,
} from './dto/order.dto';
import { eq, sql } from 'drizzle-orm';
import { OrderDelivery } from './types/order';
import { TOrder, TOrderItem } from '../types/order';

@Injectable()
export class UserOrderService {
  constructor(@Inject('DB') private db: DrizzlePg) {}
  async orderItems(
    userId: number,
    itemsArray: TBodyOrderItem[],
    delivery: OrderDelivery
  ) {
    try {
      const result = await this.db.transaction(async (tx) => {
        // Базовая информация о заказе
        let orderInfo: typeof ordersTable.$inferInsert = {
          userId,
          deliveryType:
            delivery.typeDelivery === 'cdek' ? 'CDEK' : delivery.typeDelivery,
        };

        // Обработка типа доставки
        if (delivery.typeDelivery === 'cdek') {
          if (!delivery.cdekDelivery) {
            throw new HttpException('Не указаны данные для доставки CDEK', 400);
          }
          orderInfo = {
            ...orderInfo,
            ...delivery.cdekDelivery,
          };
        } else if (delivery.typeDelivery === 'courier') {
          if (!delivery.courierDelivery) {
            throw new HttpException(
              'Не указаны данные для доставки курьером',
              400
            );
          }
          orderInfo = {
            ...orderInfo,
            ...delivery.courierDelivery,
          };
        } else {
          throw new HttpException('Неверный тип доставки', 400);
        }

        const [order] = await tx
          .insert(ordersTable)
          .values(orderInfo)
          .returning();

        if (!order) {
          throw new HttpException('Заказ не создан', 500);
        }

        const itemsToOrder = itemsArray.map((item) => ({
          itemId: item.itemId,
          grindingTypeItemId: item.grindingTypeId,
          grainItemVarId: item.itemVarId,
          orderId: order.id,
        }));

        const insertedItems = await tx
          .insert(orderItemsTable)
          .values(itemsToOrder)
          .returning();
        const itemsToOrderSend: TOrderItem[] = insertedItems.map((item) => ({
          id: item.itemId,
          title: '1',
          count: 1,
        }));
        const sum = insertedItems.length * 100;
        const orderToBot: TOrder = {
          id: order.id,
          deliveryType: delivery.typeDelivery,
          address:
            delivery.typeDelivery === 'cdek'
              ? (delivery.cdekDelivery as TCdekDelivery).cdek_address
              : (delivery.courierDelivery as TCourierDelivery)?.address,
          sum,
          status: 'reserved',

          items: itemsToOrderSend,
        };

        return orderToBot;
      });

      return result;
    } catch (err) {
      console.error('Ошибка в транзакции:', err);
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
