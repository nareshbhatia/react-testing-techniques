# Waiting for removal of an element

To wait for the removal of one or more elements from the DOM, use
`waitForElementToBeRemoved`. Here's an example from
[OrdersPage test](../src/pages/OrdersPage/OrdersPage.test.tsx):

```tsx
test('renders correctly (using waitForElementToBeRemoved)', async () => {
  const { findByText, getAllByTestId, getByText } = render(<OrdersPage />);
  await waitForElementToBeRemoved(getByText('Loading...'));
  expect(getAllByTestId('order-view')).toHaveLength(4);
});
```
