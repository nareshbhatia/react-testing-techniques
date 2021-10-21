# Avoid mocking by using Mock Service Worker

Continuing to build upon the idea of "Test your components as a user would", a
key strategy is to prefer integration testing over unit testing. By integration,
we don't just mean integrating two or more UI components, but also integrating
the service layer and API calls. As you know, many of our UI components depend
on APIs for displaying and updating data, so exercising the entire chain of
components up to the API calls is important.

This is where [Mock Service Worker](https://mswjs.io) (MSW) comes in. It
intercepts the API calls at the network level and returns the desired responses.
This enables tests to exercise components in their natural environment without
performing any surgery! Let's see how.

Consider the [OrdersPage](../src/pages/OrdersPage/OrdersPage.tsx) as an example.
This page fetches the orders from the server and displays them as a list. Here's
a short snippet from this component.

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
Service Worker and return some test data in the response.

To intercept HTTP calls, you provide a file called
[handlers.ts](../src/mocks/handlers.ts) in your project. Each request that you
want to intercept should have an associated handler. Here's the
[handler](../src/mocks/handlers.ts#L25-L27) that intercepts `GET /orders` and
returns some orders in response:

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
