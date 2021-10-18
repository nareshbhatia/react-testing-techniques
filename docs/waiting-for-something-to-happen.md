# Waiting for something to happen

When you need to wait for something to happen, use `waitFor`. In the example
below, we enter information in a form and click the Submit button. After form
validation, we expect the `handleSubmit` handler to be called. We use `waitFor`
to wait for that call to happen. Then we test to make sure that call has been
made with the right arguments.

```tsx
const handleSubmit = jest.fn();

test('submits form information if all validations pass', async () => {
  render(<TestForm onSubmit={handleSubmit} />);

  // Enter valid information and submit form
  userEvent.type(screen.getByRole('textbox', { name: /first name/i }), 'John');
  userEvent.type(screen.getByRole('textbox', { name: /last name/i }), 'Smith');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Expect handleSubmit to be called with the entered information
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  expect(handleSubmit).toHaveBeenCalledWith(
    {
      firstName: 'John',
      lastName: 'Smith',
    },
    // ignore the event that is sent to handleSubmit
    expect.anything()
  );
});
```

For more information see
[React Testing Library docs](https://testing-library.com/docs/dom-testing-library/api-async#waitfor).
