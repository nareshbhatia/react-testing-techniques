import { Address } from './Address';
import { OrderItem } from './OrderItem';

export interface Order {
  id: string;
  createdAt: string; // ISO 8601 formatted timestamp
  items: Array<OrderItem>;
  shippingAddress: Address;
}
