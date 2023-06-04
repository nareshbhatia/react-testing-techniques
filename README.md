# React Testing Techniques

This project demonstrates best practices in testing React applications by
implementing a realistic online shopping application. It is also the repository
for my Medium article titled
[React Testing Techniques](https://medium.com/engineered-publicis-sapient/react-testing-techniques-d97e9dd8f081).

P.S. If you find this project useful, please show your appreciation by starring
this repository.

## Tools of the trade

**Unit & Integration Testing**

- [Jest](https://jestjs.io/) - a testing framework designed to ensure
  correctness of any JavaScript or TypeScript codebase

- [React Testing Library](https://testing-library.com/) - a testing framework
  for React components that encourages better testing practices

- [Mock Service Worker](https://mswjs.io/) - a framework to mock APIs by
  intercepting requests at the network level. It allows us to reuse the same
  mock definition for testing, development, and debugging.

**End-to-End Testing**

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

## Why do we write tests?

For me, writing tests is about building confidence in what I am delivering.
Tests provide a mechanism to verify the intent of my code by exercising it in
various ways. Moreover, they give me the confidence that I have not broken
anything when I refactor or extend the code to meet new requirements. The last
thing I want is to get a call at 3:00 AM to fix a bug that has crashed my app!

## Guiding principles when writing tests

The principles listed in this section are based on an article by Kent C. Dodds
titled
[Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
Kent is a testing guru with very good guidance on how to test effectively. I
have listed several of his useful articles in the references below.

So without further ado, let's jump into the guiding principles.

### Don't test implementation details

If your test does something that your user doesn't, chances are that you are
testing implementation details. For example, you may be exposing a private
function just to test your component. This is a code smell – don't do it. A
refactor can easily break your test. Another example is using certain APIs of a
React testing tool called [Enzyme](https://enzymejs.github.io/enzyme/), e.g. its
`instance()`, `state()` and `setState()` APIs. Stay away from such tools,
instead use tools that make it harder to test implementation details (e.g.
[React Testing Library](https://testing-library.com/)).

### Test your components as a user would

The classic testing wisdom was to write a lot of unit tests to test individual
"units" of code. We used to isolate our components from their environment using
mocks. It was like testing a fish's swimming abilities out of the water. This
approach still makes sense for pure functions. But for UI components, which
depend on communications with surrounding components, mocking reduces our
confidence in their integrations.

> For this reason, the latest thinking is to test several units together to
> recreate real interaction scenarios, hence the name "integration testing".

This brings us to the guiding principle which is the foundation of the
[React Testing Library](https://testing-library.com/docs/guiding-principles):

> The more your tests resemble the way your software is used, the more
> confidence they can give you.

For example, drop a couple of components under a `<Context.Provider>` to test
real user interactions. You could also use
[Mock Service Worker](https://mswjs.io) to mock APIs at the network level rather
than excessively mocking at the component or service layer. We will talk more
about this in the testing techniques section below.

### Focus on use case coverage

There is a tradeoff between time spent writing tests and code coverage. Some
organizations put undue focus on code coverage. Unfortunately this sets the
wrong goal for developers. You start seeing people gaming the system by writing
meaningless tests.

Instead, focus on _use case coverage_. Think of all the use cases (including
corner cases) that you want to test to feel confident about your code. This
approach will automatically yield high code coverage. The tests in this project
were written with use case coverage in mind and yet as a byproduct we have
upwards of 90% code coverage! It is generally accepted that 80% coverage is a
good goal to aim for.

### Push business logic into pure functions rather than UI components

For example, a Shopping Cart UI component should not compute the cart total.
This should be pushed to a
[pure function](https://en.wikipedia.org/wiki/Pure_function) because it is
easier to test. Even better, push it off to the back-end where more
sophisticated calculations can be performed without complicating the UI. See
[here](./src/models/Cart.ts) for examples for pure functions and the
[related tests](./src/models/Cart.test.ts).

## Testing Techniques

Now that we understand why we test the way we do, let's go over 12 techniques
you can apply now.

1. [Setting up React Testing Library](./docs/setting-up-react-testing-library.md)
2. [Functional testing vs. snapshot testing vs. screenshot testing](./docs/functional-vs-snapshot-vs-screenshot-testing.md)
3. [Difference between queryBy, getBy and findBy queries](./docs/difference-between-query-types.md)
4. [Checking for existence of an element](./docs/checking-for-existence-of-an-element.md)
5. [Waiting for removal of an element](./docs/waiting-for-removal-of-an-element.md)
6. [Waiting for something to happen](./docs/waiting-for-something-to-happen.md)
7. [fireEvent() vs userEvent](./docs/fireEvent-vs-userEvent.md)
8. [Mocking an event handler](./docs/mocking-an-event-handler.md)
9. [Avoid mocking by using Mock Service Worker](./docs/avoid-mocking-by-using-mock-service-worker.md)
10. [Overriding MSW handlers](./docs/overriding-msw-handlers.md)
11. [Testing page navigation](./docs/testing-page-navigation.md)
12. [Suppressing console errors](./docs/suppressing-console-errors.md)

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

## Running In Production Mode

Because MSW is disabled in production mode, you must first run an external API
server. To do this, clone the
[React Test Shop Server](https://github.com/nareshbhatia/react-test-shop-server)
repository and follow the instructions there to start an API server on
port 8080.

Now build this project in production mode and start it using a web server like
`serve`:

```sh
yarn build
serve -s build
```

## Screenshots

### Home Page

![Home Page](assets/screenshot-home.png)

### Checkout Page

![Checkout Page](assets/screenshot-checkout.png)

### Orders Page

![Orders Page](assets/screenshot-orders.png)

## References

### Testing Best Practices

- [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
  by Kent C. Dodds
- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
  by Kent C. Dodds
- [Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests)
  by Kent C. Dodds
- [Making your UI tests resilient to change](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change)
  by Kent C. Dodds
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
  by Kent C. Dodds

### Jest

- [Documentation](https://jestjs.io/docs/getting-started)

### React Testing Library

- [Introduction](https://testing-library.com/docs/)
- [Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Example](https://testing-library.com/docs/react-testing-library/example-intro)
- [Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Query Priority Guidelines](https://testing-library.com/docs/queries/about/#priority)
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Storybook

- [Introduction to Storybook](https://storybook.js.org/docs/react/get-started/introduction)

### Mock Service Worker

- [Documentation](https://mswjs.io/docs/)

### Cypress

- [Documentation](https://docs.cypress.io/guides/overview/why-cypress)
