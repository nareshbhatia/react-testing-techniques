import { Cart, CartUtils } from './Cart';
import { Product } from './Product';

const product1: Product = {
  id: 'apple-macbook-pro',
  name: 'MacBook Pro',
  description: 'Defy limits and change the world',
  manufacturer: 'Apple',
  price: 100,
  photo: 'https://photos.example.com/1',
};

const product2: Product = {
  id: 'apple-imac',
  name: 'iMac',
  description: 'Take any idea to the next level',
  manufacturer: 'Apple',
  price: 200,
  photo: 'https://photos.example.com/2',
};

const cartQuantity0: Cart = {
  items: [],
};

const cartQuantity1: Cart = {
  items: [
    {
      productId: 'apple-macbook-pro',
      productName: 'MacBook Pro',
      price: 100,
      quantity: 1,
    },
  ],
};

const cartQuantity2: Cart = {
  items: [
    {
      productId: 'apple-macbook-pro',
      productName: 'MacBook Pro',
      price: 100,
      quantity: 1,
    },
    {
      productId: 'apple-imac',
      productName: 'iMac',
      price: 200,
      quantity: 1,
    },
  ],
};

const cartQuantity3: Cart = {
  items: [
    {
      productId: 'apple-macbook-pro',
      productName: 'MacBook Pro',
      price: 100,
      quantity: 2,
    },
    {
      productId: 'apple-imac',
      productName: 'iMac',
      price: 200,
      quantity: 1,
    },
  ],
};

const cartQuantity5: Cart = {
  items: [
    {
      productId: 'apple-macbook-pro',
      productName: 'MacBook Pro',
      price: 100,
      quantity: 2,
    },
    {
      productId: 'apple-imac',
      productName: 'iMac',
      price: 200,
      quantity: 3,
    },
  ],
};

describe('CartUtils', () => {
  describe('total()', () => {
    it('return 0 if cart is empty', () => {
      expect(CartUtils.total(cartQuantity0)).toBe(0);
    });

    it('return the correct total if cart is populated', () => {
      expect(CartUtils.total(cartQuantity5)).toBe(800);
    });
  });

  describe('addProduct()', () => {
    it('adds new item if product does not exist in the cart', () => {
      let cart = CartUtils.addProduct(cartQuantity0, product1);
      expect(cart).toEqual(cartQuantity1);
      cart = CartUtils.addProduct(cart, product2);
      expect(cart).toEqual(cartQuantity2);
    });

    it('increments the quantity if product already exists in the cart', () => {
      let cart = CartUtils.addProduct(cartQuantity0, product1);
      cart = CartUtils.addProduct(cart, product2);
      cart = CartUtils.addProduct(cart, product1);

      expect(cart).toEqual(cartQuantity3);
    });
  });

  describe('deleteItem()', () => {
    it('deletes the specified item from the cart', () => {
      let cart = CartUtils.addProduct(cartQuantity0, product1);
      cart = CartUtils.addProduct(cart, product2);
      expect(cart).toEqual(cartQuantity2);

      cart = CartUtils.deleteItem(cart, product2.id);
      expect(cart).toEqual(cartQuantity1);
    });
  });

  describe('setItemQuantity()', () => {
    it('sets quantity to the specified value', () => {
      let cart = CartUtils.addProduct(cartQuantity0, product1);
      cart = CartUtils.addProduct(cart, product2);
      cart = CartUtils.setItemQuantity(cart, product1.id, 2);
      cart = CartUtils.setItemQuantity(cart, product2.id, 3);

      expect(cart).toEqual(cartQuantity5);
    });
  });
});
