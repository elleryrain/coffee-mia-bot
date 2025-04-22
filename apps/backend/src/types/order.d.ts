export type TOrder = {
  id: number;
  deliveryType: 'courier' | 'cdek';
  address: string | null;
  sum: number;
  status: string;
  items: TOrderItem[];
};

export type TOrderItem = {
  id: number;
  title: string;
  count: number;
};
