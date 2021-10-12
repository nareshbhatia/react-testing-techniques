import { Storage } from '../utils';
import { Cart } from '../models';

const CART_KEY = 'mockDbCart';

// The mock database keeps all data in memory. However it is backed by
// localStorage. Anytime a value is written to the in-memory database,
// it is also persisted to localStorage.

// -------------------- Initialize in-memory database --------------------
// cart
let cart: Cart = Storage.get(CART_KEY, { items: [] });
// -----------------------------------------------------------------------

function getCart(): Cart {
  return cart;
}

function setCart(newCart: Cart) {
  cart = newCart;
  Storage.set(CART_KEY, cart);
}

function clearCart() {
  cart = { items: [] };
  Storage.set(CART_KEY, cart);
}

export const mockDb = {
  getCart,
  setCart,
  clearCart,
};
