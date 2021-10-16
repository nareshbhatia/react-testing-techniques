import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { MOCK_API_URL } from '../../../mocks/constants';
import { server } from '../../../mocks/server';
import { CartUtils } from '../../../models';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../test/test-utils';
import { CartView } from './CartView';

const START_ORDER = 'Please click on a product to start your order.';

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

const MockCheckoutPage = () => {
  return <h1>Checkout Page</h1>;
};

describe('<CartView />', () => {
  test('renders correctly with no order items', async () => {
    render(<CartView />);

    // start order message should exist
    const startOrderMessage = await screen.findByText(START_ORDER);
    expect(startOrderMessage).toBeInTheDocument();

    // checkout button should not exist
    const checkoutButton = screen.queryByText('Checkout');
    expect(checkoutButton).toBeNull();
  });

  test('renders correctly with one or more order items', async () => {
    // simulate 2 items in the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(cart));
      })
    );

    render(<CartView />);

    // checkout button should exist
    const checkoutButton = await screen.findByText('Checkout');
    expect(checkoutButton).not.toBeNull();

    // start order message should not exist
    const startOrderMessage = screen.queryByText(START_ORDER);
    expect(startOrderMessage).toBeNull();

    // 2 order items should exist
    const orderItemTable = await screen.findByTestId('order-items');
    const orderItems = orderItemTable.querySelectorAll('tbody tr');
    expect(orderItems.length).toBe(2);
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

    render(<CartView />);
    const errorMessage = await screen.findByText(/404/);
    expect(errorMessage).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('clicking on delete button deletes the item from the order', async () => {
    // simulate 2 items in the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(cart));
      })
    );

    // simulate delete from 2 items in the cart
    server.use(
      rest.delete(`${MOCK_API_URL}/cart/items/:productId`, (req, res, ctx) => {
        const { productId } = req.params;
        const newCart = CartUtils.deleteItem(cart, productId);
        return res(ctx.status(200), ctx.json(newCart));
      })
    );

    render(<CartView />);

    // wait for Checkout button to render
    await screen.findByText('Checkout');

    // delete the first item from the order
    const deleteButtons = await screen.findAllByTestId('delete-button');
    expect(deleteButtons.length).toBe(2);
    userEvent.click(deleteButtons[0]);

    // wait for 'iMac' to disappear
    await waitForElementToBeRemoved(() => screen.getByText('iMac'));

    // only 1 item should remain
    const orderItemTable = await screen.findByTestId('order-items');
    expect(orderItemTable.querySelectorAll('tbody tr').length).toBe(1);

    // the remaining item should be 'MacBook Pro'
    const macbookPro = screen.getByText('MacBook Pro');
    expect(macbookPro).toBeInTheDocument();
  });

  test('item quantity can be changed by typing into the quantity field', async () => {
    // simulate 2 items in the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(cart));
      })
    );

    // simulate set item quantity
    server.use(
      rest.patch(`${MOCK_API_URL}/cart/items/:productId`, (req, res, ctx) => {
        const { productId } = req.params;
        const { quantity } = req.body as any;
        const newCart = CartUtils.setItemQuantity(cart, productId, quantity);
        return res(ctx.status(200), ctx.json(newCart));
      })
    );

    render(<CartView />);

    // wait for 2 items to render
    const quantityInputs = await screen.findAllByTestId('quantity-input');
    expect(quantityInputs).toHaveLength(2);

    // change iMac quantity to 2
    // Note the use of {selectall} - without this 2 will be simply
    // appended to the existing quantity, resulting in 12.
    userEvent.type(quantityInputs[0], '{selectall}2');

    // wait for price of iMac line item to change
    const priceCells = screen.getAllByTestId('price-cell');
    await waitFor(() => expect(priceCells[0].textContent).toBe('2,598.00'));
  });

  // Note: Applications should probably not check that navigation works,
  // because React Router has lots of tests to assure us that it works!
  // However, if you must, here's how to.
  test('clicking on checkout button navigates to Checkout page', async () => {
    // simulate 2 items in the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(cart));
      })
    );

    render(
      <Routes>
        <Route path="/" element={<CartView />} />
        <Route path="/checkout" element={<MockCheckoutPage />} />
      </Routes>
    );

    // click on Checkout button
    const checkoutButton = await screen.findByText('Checkout');
    userEvent.click(checkoutButton);

    // expect checkout page to be rendered
    const checkoutPageTitle = await screen.findByText('Checkout Page');
    expect(checkoutPageTitle).toBeInTheDocument();
  });
});
