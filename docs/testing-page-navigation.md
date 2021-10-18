# Testing page navigation

> Note: Applications should probably not check that navigation works, because
> React Router has lots of tests to assure us that it works! However, if you
> must, here's how to.

Suppose we want to test that clicking on the Checkout button in the shopping
cart navigates to the Checkout page. To test this, we can render the source and
destination components inside `<Routes>`. Then click the Checkout button and
verify that the application indeed navigate to the Checkout page. Here's
[the test](../src/pages/HomePage/CartView/CartView.test.tsx):

```tsx
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
```
