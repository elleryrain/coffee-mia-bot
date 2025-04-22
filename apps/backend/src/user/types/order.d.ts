import { TCdekDelivery, TCourierDelivery } from '../dto/order.dto';

export type OrderDelivery = {
  typeDelivery: 'courier' | 'cdek';
  courierDelivery?: TCourierDelivery;
  cdekDelivery?: TCdekDelivery;
};
