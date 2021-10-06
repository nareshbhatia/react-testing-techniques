import { rest } from 'msw';
import { CartUtils } from '../models';
import { MOCK_API_URL } from './constants';
import { mockCatalog } from './mockCatalog';
import { mockDb } from './mockDb';

interface AddProductInput {
  productId: string;
}

export const handlers = [
  rest.get(`${MOCK_API_URL}/catalog`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCatalog));
  }),

  rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDb.getCart()));
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
];
