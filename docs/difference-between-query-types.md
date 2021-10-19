# Difference between queryBy, getBy and findBy queries

The queries returned by the `render()` function in React Testing Library give us
a way to find elements on a page. For example, in the test below, `getByRole` is
used to find an input element and the submit button.

```tsx
test('displays a validation error if validation fails', async () => {
  render(<TestForm onSubmit={handleSubmit} />);

  // Submit form with lastName not filled
  userEvent.type(screen.getByRole('textbox', { name: /first/i }), 'John');
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Expect to see a validation error
  expect(await screen.findByText('lastName is a required field')).toBeTruthy();
});
```

However, React Testing Library offers several query types (`queryBy`, `getBy`
and `findBy`) that are useful in different use cases. The difference is in their
behavior for different number of matches found and whether they wait for the
element to appear. The table below summarizes this behavior:

|         | No Match | 1 Match | 1+ Match | Await? |
| ------- | -------- | ------- | -------- | ------ |
| queryBy | null     | return  | throw    | No     |
| getBy   | throw    | return  | throw    | No     |
| findBy  | throw    | return  | throw    | Yes    |

- `queryBy` is the most lenient query which returns a null if no match is found
  and returns the element when a match is found. The use of this query is
  recommended only to check the non-existence of an element.
- `getBy` is a stricter query which throws if no match is found. So this one
  should be used when you expect the element to be available, otherwise you want
  the test to fail.
- `findBy` is similar to `getBy` in the sense that it will throw if the element
  is not available, but it waits up to a timeout period (default is 1000ms) for
  the element to appear. Use this query type if you are expecting the element to
  appear after sometime, e.g. if your test is fetching data to show the element.
  `findBy` queries are asynchronous and should be always used with `await`.

Finally, note that all these queries will throw if they find more than 1
matches. If you are expecting this, use the "All" versions of the queries:
`queryAllBy`, `getAllBy` and `findAllBy`.

For more details, visit the following links:

- [React Testing Library | Queries](https://testing-library.com/docs/react-testing-library/cheatsheet/#queries)

- [DOM Testing Library | Queries](https://testing-library.com/docs/queries/about/)

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
