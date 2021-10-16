import React from 'react';
import { rest } from 'msw';
import { MOCK_API_URL } from '../../mocks/constants';
import { server } from '../../mocks/server';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../test/test-utils';
import { OrdersPage } from './OrdersPage';

describe('<OrdersPage />', () => {
  test('renders correctly', async () => {
    render(<OrdersPage />);
    expect(await screen.findAllByTestId('order-view')).toHaveLength(4);
  });

  test('renders correctly (using waitForElementToBeRemoved)', async () => {
    render(<OrdersPage />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getAllByTestId('order-view')).toHaveLength(4);
  });

  test('renders an error if fetching of the orders fails', async () => {
    // simulate an error when fetching orders
    server.use(
      rest.get(`${MOCK_API_URL}/orders`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    // Suppress console errors
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<OrdersPage />);
    const errorMessage = await screen.findByText(/404/);
    expect(errorMessage).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
