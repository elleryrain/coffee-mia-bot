import { TCdekDelivery, TCourierDelivery } from '../dto/order.dto';

export type OrderDelivery = {
  typeDelivery: 'courier' | 'cdek';
  courierDelidery?: TCourierDelivery;
  cdekDelivery?: TCdekDelivery;
};
