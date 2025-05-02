export type TPostOrderBodyDto = {
  id: number;
  userId: number;
  deliveryType: 'courier' | 'cdek';
  cdekDelivery:
    | {
        first_name: 'string';
        last_name: 'string';
        middle_name: 'string';
        phone: 'string';
        cdek_address: 'string';
      }
    | undefined;
  courierDelivery:
    | {
        first_name: 'string';
        telegram_nickname: 'string';
        phone: 'string';
        address: 'string';
        date: 'string';
        time: 'string';
        comment: 'string';
      }
    | undefined;
  sum: number;
  status: string;
  items: TPostOrderItemDto[];
};
export type TPostOrderItemDto = {
  id: number;
  name: string;
  grindingTypeName: string;
  count: number;
  cost: number;
  weight: number;
};
