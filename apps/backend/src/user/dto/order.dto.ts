export type TBodyOrderItem = {
  itemId: number;
  itemVarId?: number;
  grindingTypeId?: number;
};

export type TCourierDelivery = {
  first_name: string;
  telegram_nickname: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  comment: string;
};

export type TCdekDelivery = {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  cdek_address: string;
};

export type TBody = {
  typeDelivery: 'courier' | 'cdek';
  items: TBodyOrderItem[];
  courierDelivery?: TCourierDelivery;
  cdekDelivery?: TCdekDelivery;
};
