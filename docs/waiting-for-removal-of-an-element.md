# Waiting for removal of an element

To wait for the removal of one or more elements from the DOM, use
`waitForElementToBeRemoved`. Here's an example from
[OrdersPage test](../src/pages/OrdersPage/OrdersPage.test.tsx):

```tsx
test('renders correctly (using waitForElementToBeRemoved)', async () => {
  render(<OrdersPage />);
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  expect(screen.getAllByTestId('order-view')).toHaveLength(4);
});
```
