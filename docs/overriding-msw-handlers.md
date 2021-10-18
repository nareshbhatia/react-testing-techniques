# Overriding MSW handlers

As discussed earlier, Mock Service Worker (MSW) handlers intercept HTTP calls at
the network level and return mock responses. Here's the
[handler for returning the shopping cart](../src/mocks/handlers.ts#L20-L22). It
essentially returns the cart that is saved in localStorage.

```ts
rest.get(`${MOCK_API_URL}/cart`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mockDb.getCart()));
});
```

However, we can't rely on this handler for testing our `CartView` because the
contents of the cart will depend on whatever happens to be saved in the
localStorage. To force a known number of items in the cart, we can override the
above handler in our test using `server.use`. Here's how we do it in the
[CartView test](../src/pages/HomePage/CartView/CartView.test.tsx#L52-L74).

```tsx
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
```

Note that the overrides should be removed after the test so that they don't
interfere with other tests. This is done in
[setupTests.ts](../src/setupTests.ts#L19-L21).
