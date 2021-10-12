import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { CartUtils, CheckoutInfo, Order } from '../models';
import { MOCK_API_URL } from './constants';
import { mockCatalog } from './mockCatalog';
import { mockDb } from './mockDb';
import mockOrders from './mockOrders.json';

interface AddProductInput {
  productId: string;
}

export const handlers = [
  /** get catalog */
  rest.get(`${MOCK_API_URL}/catalog`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCatalog));
  }),

  /** get cart */
  rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDb.getCart()));
  }),

  /** get orders */
  rest.get(`${MOCK_API_URL}/orders`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockOrders));
  }),

  /** add a product to the cart */
  rest.post(`${MOCK_API_URL}/cart/items`, (req, res, ctx) => {
    const { productId } = req.body as AddProductInput;
    const cart = mockDb.getCart();
    const newCart = CartUtils.addProduct(cart, mockCatalog[productId]);
    mockDb.setCart(newCart);
    return res(ctx.status(200), ctx.json(newCart));
  }),

  /** delete an item from the cart */
  rest.delete(`${MOCK_API_URL}/cart/items/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const cart = mockDb.getCart();
    const newCart = CartUtils.deleteItem(cart, productId);
    mockDb.setCart(newCart);
    return res(ctx.status(200), ctx.json(newCart));
  }),

  /** set the quantity of an item in the cart **/
  rest.patch(`${MOCK_API_URL}/cart/items/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const { quantity } = req.body as any;
    const cart = mockDb.getCart();
    const newCart = CartUtils.setItemQuantity(cart, productId, quantity);
    mockDb.setCart(newCart);
    return res(ctx.status(200), ctx.json(newCart));
  }),

  /** create an order */
  rest.post(`${MOCK_API_URL}/orders`, (req, res, ctx) => {
    const checkoutInfo = req.body as CheckoutInfo;

    // Move cart items into the order
    const order: Order = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      items: mockDb.getCart().items,
      shippingAddress: checkoutInfo.shippingAddress,
    };
    // @ts-ignore
    mockOrders.push(order);

    // clear the cart
    mockDb.clearCart();

    return res(ctx.status(200), ctx.json(order));
  }),
];
