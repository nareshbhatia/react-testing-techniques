# React Testing Techniques

This project demonstrates best practices in testing React applications by
implementing a realistic online shopping application.

We use the following tools for testing:

**Unit Testing**

- [Jest](https://jestjs.io/) - a testing framework designed to ensure
  correctness of any JavaScript or TypeScript codebase

- [React Testing Library](https://testing-library.com/) - a testing framework
  for React components that encourages better testing practices

- [Mock Service Worker](https://mswjs.io/) - a framework to mock APIs by
  intercepting requests at the network level. It allows us to reuse the same
  mock definition for testing, development, and debugging.

**Integration Testing**

- [Cypress](https://www.cypress.io/) - a testing framework for fully built Web
  applications running in a browser

**Manual Testing**

- [Storybook](https://storybook.js.org/) - a tool that helps build components in
  isolation and record their states as stories. Stories make it easy to explore
  a component in all its permutations no matter how complex. They also serve as
  excellent visual test cases. Storybook testing can also be automated. For
  details, look at the
  [Storybook documentation](https://storybook.js.org/docs/react/workflows/testing-with-storybook).

_This project was bootstrapped with
[React Accelerate](https://github.com/PublicisSapient/cra-template-accelerate)._

## Testing Topics

- Guiding principles
- Structuring code - Pure JavaScript functions vs. React components
- Snapshot testing vs. traditional unit testing
- Difference between queryBy, getBy and findBy queries
- Checking for existence of an element
- Waiting for removal of an element
- Waiting for something to happen
- fireEvent() vs userEvent
- Mocking an event handler (see ProductView test)
- Using Mock Service Worker vs. Jest mocking
- Overriding/mocking MSW handlers (see CartView & CatalogView tests)
- Testing for page navigation
- Suppressing console errors

## Getting Started

> Note: If you prefer to use npm, please feel free to replace the yarn commands
> in this section with equivalent npm commands.

Make sure your development machine is set up for building React apps. See the
recommended setup procedure
[here](https://github.com/nareshbhatia/react-learning-resources#developer-machine-setup).

Execute the following commands to install dependencies:

```sh
yarn install
```

Execute the following commands to run the app:

```sh
yarn start
```

Now point your browser to http://localhost:3000/.

## Running Unit Tests

Execute one of the following command to run unit tests.

```sh
yarn test # interactive mode

# OR

yarn test:coverage # non-interactive mode with coverage information
```

## Running End-to-End Tests

```sh
yarn start # starts a local server hosting your react app

# in a difference shell, run cypress
yarn cypress:open
```

## Running Storybook

```sh
yarn storybook
```

## Screenshots

### Home Page

![Home Page](assets/screenshot-home.png)

## Checkout Page

![Checkout Page](assets/screenshot-checkout.png)

## Order Page

![Orders Page](assets/screenshot-orders.png)

## References

### Testing Best Practices

- [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests)
- [Making your UI tests resilient to change](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

### Jest

- [Documentation](https://jestjs.io/docs/getting-started)

### React Testing Library

- [Introduction](https://testing-library.com/docs/)
- [Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Example](https://testing-library.com/docs/react-testing-library/example-intro)
- [Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)

### Storybook

- [Introduction to Storybook](https://storybook.js.org/docs/react/get-started/introduction)

### Mock Service Worker

- [Documentation](https://mswjs.io/docs/)

### Cypress

- [Documentation](https://docs.cypress.io/guides/overview/why-cypress)
