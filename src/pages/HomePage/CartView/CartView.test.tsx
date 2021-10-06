import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { MOCK_API_URL } from '../../../mocks/constants';
import { server } from '../../../mocks/server';
import { CartUtils } from '../../../models';
import { render, waitFor } from '../../../test/test-utils';
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
    const { findByText, queryByText } = render(<CartView />);

    // start order message should exist
    const startOrderMessage = await findByText(START_ORDER);
    expect(startOrderMessage).toBeInTheDocument();

    // checkout button should not exist
    const checkoutButton = queryByText('Checkout');
    expect(checkoutButton).toBeNull();
  });

  test('renders correctly with one or more order items', async () => {
    // simulate 2 items in the cart
    server.use(
      rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(cart));
      })
    );

    const { findByTestId, findByText, queryByText } = render(<CartView />);

    // checkout button should exist
    const checkoutButton = await findByText('Checkout');
    expect(checkoutButton).not.toBeNull();

    // start order message should not exist
    const startOrderMessage = queryByText(START_ORDER);
    expect(startOrderMessage).toBeNull();

    // 2 order items should exist
    const orderItemTable = await findByTestId('order-items');
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

    const { findByText } = render(<CartView />);
    const errorMessage = await findByText(/404/);
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

    const {
      findAllByTestId,
      findByTestId,
      findByText,
      getByText,
      queryByText,
    } = render(<CartView />);

    // wait for Checkout button to render
    await findByText('Checkout');

    // delete the first item from the order
    const deleteButtons = await findAllByTestId('delete-button');
    expect(deleteButtons.length).toBe(2);
    userEvent.click(deleteButtons[0]);

    // wait for 'iMac' to disappear
    // TODO: waitForElementToBeRemoved times out even though the element is removed!!!
    // await waitForElementToBeRemoved(queryByText('iMac'));

    // wait for 1 item to remain
    const orderItemTable = await findByTestId('order-items');
    await waitFor(() =>
      expect(orderItemTable.querySelectorAll('tbody tr').length).toBe(1)
    );

    // 'iMac' should not exist
    const iMac = queryByText('iMac');
    expect(iMac).toBeNull();

    // 'MacBook Pro' should exist
    const macbookPro = getByText('MacBook Pro');
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

    const { getAllByTestId, queryAllByTestId } = render(<CartView />);

    // wait for 2 items to render
    // TODO: This was needed because of some interference with the earlier test.
    // That test was resulting in only 1 item to be rendered even though I have
    // server.use() in this test to return 2 items.
    await waitFor(() =>
      expect(queryAllByTestId('quantity-input').length).toBe(2)
    );

    // change iMac quantity to 2
    // Note the use of {selectall} - without this 2 will be simply
    // appended to the existing quantity, resulting in 12.
    const quantityInputs = getAllByTestId('quantity-input');
    userEvent.type(quantityInputs[0], '{selectall}2');

    // wait for price of iMac line item to change
    const priceCells = getAllByTestId('price-cell');
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

    const { findByText } = render(
      <Routes>
        <Route path="/" element={<CartView />} />
        <Route path="/checkout" element={<MockCheckoutPage />} />
      </Routes>
    );

    // click on Checkout button
    const checkoutButton = await findByText('Checkout');
    userEvent.click(checkoutButton);

    // expect checkout page to be rendered
    const checkoutPageTitle = await findByText('Checkout Page');
    expect(checkoutPageTitle).toBeInTheDocument();
  });
});
