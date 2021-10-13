import { OrderItem, OrderItemUtils } from './OrderItem';
import { Product } from './Product';

// ----------------------------------------------------------------------------
// Cart contains a list of OrderItems.
// ----------------------------------------------------------------------------
export interface Cart {
  items: Array<OrderItem>;
}

// ----------------------------------------------------------------------------
// Cart utility functions
// These are pure functions with a deterministic output.
// If the cart needs to be modified, a new instance is returned.
// In other words, the Cart is immutable.
// ----------------------------------------------------------------------------
function total(cart: Cart): number {
  return OrderItemUtils.totalItems(cart.items);
}

function findItem(cart: Cart, productId: string): OrderItem | undefined {
  return cart.items.find((item) => item.productId === productId);
}

function addItem(cart: Cart, item: OrderItem): Cart {
  // make a copy of items and add a new one
  let newItems = cart.items.slice();
  newItems.push(item);
  return { ...cart, items: newItems };
}

function deleteItem(cart: Cart, productId: string): Cart {
  let newItems = cart.items.filter((item) => item.productId !== productId);
  return { ...cart, items: newItems };
}

function setItemQuantity(cart: Cart, productId: string, quantity: number) {
  let newItems = cart.items.map((item) =>
    item.productId !== productId
      ? item
      : {
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity,
        }
  );
  return { ...cart, items: newItems };
}

/**
 * If the product already exists in the cart, simply increments the quantity
 */
function addProduct(cart: Cart, product: Product): Cart {
  const { id, name, price } = product;
  const existingItem = findItem(cart, id);
  return existingItem
    ? setItemQuantity(cart, id, existingItem.quantity + 1)
    : addItem(cart, {
        productId: id,
        productName: name,
        price: price,
        quantity: 1,
      });
}

export const CartUtils = {
  total,
  addProduct,
  deleteItem,
  setItemQuantity,
};
