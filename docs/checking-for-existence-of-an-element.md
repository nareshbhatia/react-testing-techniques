# Checking for existence of an element

Use a `getBy` query combined with the `toBeInTheDocument` matcher. For example:

```ts
expect(screen.getByText('iMac')).toBeInTheDocument();
```

If the element may take some time to appear, then use the `findBy` query. Be
sure to use `await` in this case. For example:

```ts
expect(await screen.findByText('iMac')).toBeInTheDocument();
```

If you expect the element to not exist in the document, use the `queryBy` query.
For example:

```ts
expect(screen.queryByText('iMac')).not.toBeInTheDocument();
```
