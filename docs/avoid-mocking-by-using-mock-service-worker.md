# Avoid mocking by using Mock Service Worker

As discussed in the Guiding Principles, excessive mocking at the component level
reduces our confidence in their integration with other components and the
service layer. This can be avoided by mocking at the network level using
[Mock Service Worker](https://mswjs.io/).

Let's consider the [OrdersPage](../src/pages/OrdersPage/OrdersPage.tsx) as an
example. This page fetches the orders from the server and displays them as a
list. Here's a short snippet from this component.

```tsx
import { useOrdersQuery } from '../../services';

export const OrdersPage = () => {
  const { isLoading, isError, error, data: orders } = useOrdersQuery();
  ...

  return (
    <div>
      {orders.map((order) => (
        <OrderView key={order.id} order={order} />
      ))}
    </div>
  );
};
```

To test this component, we could mock the `useOrdersQuery` hook and artificially
provide some orders to display inside the component. Instead, we decided to
leave all the application code intact and let the component make a real HTTP
call from the test. We then intercept this call at the network level using Mock
Service Worker and return some test data in the response. Here's the
[MSW handler](../src/mocks/handlers.ts#L25-L27) that returns the response:

```ts
rest.get(`${MOCK_API_URL}/orders`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mockOrders));
});
```

Finally, here's the test for the `OrdersPage`. Look how simple it is - no
mocking whatsoever!

```tsx
test('renders correctly', async () => {
  render(<OrdersPage />);
  expect(await screen.findAllByTestId('order-view')).toHaveLength(4);
});
```
