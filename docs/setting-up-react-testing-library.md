# Setting up React Testing Library

It's useful to customize React Testing Library's `render` method to include
things like global context providers, data stores, etc. which are used in your
app. This enables tests to run in an environment closer to your real app. In
addition, this approach avoids repeating wrappers in every test. To make this
render method available globally, define a utility file that re-exports
everything from React Testing Library while customizing the `render` method with
your app-specific wrappers. Here's an example:
[test-utils.tsx](../src/test/test-utils.tsx).

## Start importing test-utils.tsx

Once you have a custom render method in `test-utils`, replace React Testing
Library imports in your tests with this file. For example, replace

```ts
import { render } from '@testing-library/react';
```

with

```ts
import { render } from '../../test/test-utils';
```

## Import userEvent from test-utils.tsx

Note that `test-utils` re-exports `userEvent`. This allows us to reduce the
number of imports in our tests. For example, we can replace

```ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

with

```ts
import { render, screen, userEvent } from '../../test/test-utils';
```

## Easily set initial route using the custom render method

If your test needs to start on a specific route, use the `initalRoute` option
provided by the custom render method. For example:

```tsx
render(<App />, { initialRoute: '/signin' });
```
