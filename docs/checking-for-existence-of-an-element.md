# Checking for existence of an element

Use a `getBy` query combined with the `toBeInTheDocument` matcher. For example:

```ts
expect(getByText('iMac')).toBeInTheDocument();
```

If the element may take some time to appear, then use the `findBy` query. Be
sure to use `await` in this case. For example:

```ts
expect(await findByText('iMac')).toBeInTheDocument();
```
