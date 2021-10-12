import React from 'react';
import { rest } from 'msw';
import { MOCK_API_URL } from '../../../mocks/constants';
import { server } from '../../../mocks/server';
import { render } from '../../../test/test-utils';
import { CartSummary } from './CartSummary';

const cart = {
  items: [
    {
      productId: 'apple-imac',
      productName: 'iMac',
      price: 1299,
      quantity: 1,
    },
    {
      productId: 'apple-macbook-pro',
      productName: 'MacBook Pro',
      price: 699,
      quantity: 1,
    },
  ],
};

describe('<CartSummary />', () => {
  test('renders correctly', async () => {
    // simulate 2 items in the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(cart));
      })
    );

    const { findAllByTestId } = render(<CartSummary />);

    // expect 2 items
    expect(await findAllByTestId('order-item')).toHaveLength(2);
  });

  test('renders an error if fetching of the cart fails', async () => {
    // simulate an error when fetching the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    // Suppress console errors
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { findByText } = render(<CartSummary />);
    const errorMessage = await findByText(/404/);
    expect(errorMessage).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
