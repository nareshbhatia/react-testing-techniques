import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { MOCK_API_URL } from '../../mocks/constants';
import mockOrders from '../../mocks/mockOrders.json';
import { server } from '../../mocks/server';
import { render, screen, waitFor } from '../../test/test-utils';
import { CheckoutPage } from './CheckoutPage';
import { CheckoutInfo, Order } from '../../models';

const address = mockOrders[0].shippingAddress;

const handleShippingAddress = jest.fn();

describe('<CheckoutPage />', () => {
  test('allows to place an order', async () => {
    // mock create order API
    server.use(
      rest.post(`${MOCK_API_URL}/orders`, (req, res, ctx) => {
        const checkoutInfo = req.body as CheckoutInfo;

        handleShippingAddress(checkoutInfo.shippingAddress);

        // Create a dummy order
        const order: Order = {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          items: [],
          shippingAddress: checkoutInfo.shippingAddress,
        };

        return res(ctx.status(200), ctx.json(order));
      })
    );

    render(<CheckoutPage />);

    // Enter shipping address and place order
    userEvent.type(
      screen.getByRole('textbox', { name: /first name/i }),
      address.firstName
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /last name/i }),
      address.lastName
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /company/i }),
      address.company
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /address/i }),
      address.address
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /city/i }),
      address.city
    );
    userEvent.type(
      screen.getByRole('textbox', { name: /state/i }),
      address.state
    );
    userEvent.type(screen.getByRole('textbox', { name: /zip/i }), address.zip);
    userEvent.click(screen.getByRole('button', { name: /place your order/i }));

    // expect create order API to be called
    await waitFor(() => expect(handleShippingAddress).toBeCalledTimes(1));
    expect(handleShippingAddress).toBeCalledWith(address);
  });
});
