# Suppressing console errors

Sometimes we want to test that errors are handled correctly. However, inducing
an error in a test sometimes has an undesired side effect that we see annoying
error logs in our console. In such cases it is possible to temporarily suppress
console errors. Here's a
[test](../src/pages/HomePage/CatalogView/CatalogView.test.tsx#L20-L37) that does
this:

```tsx
test('renders an error if fetching of the catalog fails', async () => {
  // simulate an error when fetching the catalog
  server.use(
    rest.get(`${MOCK_API_URL}/catalog`, (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  // suppress console errors
  jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<CatalogView />);
  const errorMessage = await screen.findByText(/404/);
  expect(errorMessage).toBeInTheDocument();

  // restore console errors
  jest.restoreAllMocks();
});
```

We can also suppress console errors for an entire test suite by suppressing them
in `beforeEach()`. Here's a
[test suite](../src/components/ErrorBoundary/ErrorBoundary.test.tsx#L5-L14) that
does that.
