# fireEvent() vs userEvent

React Testing Library provides a function called `fireEvent()` to fire an event.
For example:

```ts
fireEvent.change(input, { target: { value: 'hello world' } });
```

However, you should prefer methods provided by the package
`@testing-library/user-event` over `fireEvent()`. While `userEvent` is built on
top of `fireEvent()`, it provides methods that simulate user interactions more
closely. For example `userEvent.type()` in the example below will trigger
`keyDown`, `keyPress`, and `keyUp` events for each character which is much
closer to the user's actual interactions.

```ts
userEvent.type(input, 'hello world');
```
