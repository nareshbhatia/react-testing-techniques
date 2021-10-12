export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

function totalItem(item: OrderItem): number {
  return item.price * item.quantity;
}

function totalItems(items: Array<OrderItem>): number {
  return items.reduce((accumulator, item) => {
    return accumulator + totalItem(item);
  }, 0);
}

export const OrderItemUtils = {
  totalItem,
  totalItems,
};
