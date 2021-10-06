# React Testing Techniques

This project implements an online shopping application to show techniques used
to test React applications. We use the following tools for testing:

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

This project was bootstrapped with
[React Accelerate](https://github.com/PublicisSapient/cra-template-accelerate).

## Screenshots

**Home page with item catalog and shopping cart**

![Home Page](assets/screenshot-home.png)

## Getting Started

Make sure your development machine is set up for building React apps. See the
recommended setup procedure
[here](https://github.com/nareshbhatia/react-learning-resources/blob/main/docs/mac-setup.md).

Execute the following commands to install dependencies:

```sh
# if using yarn v7 add --legacy-peer-deps option
# see details here: https://github.com/storybookjs/storybook/issues/12983
yarn install
```

Now execute the following commands to run the app:

```sh
yarn start
```

Now point your browser to http://localhost:3000/.

## Running Unit Tests

React Accelerate comes ready with Jest and React Testing Library to run unit
tests. Execute one of the following command to run unit tests.

```sh
yarn test # interactive mode
yarn test:coverage # non-interactive mode with coverage information
```

Note that unit tests are automatically executed when you commit code to your
local repo. This ensures that you are not committing broken code.

## Running End-to-End Tests

React Accelerate comes ready with Cypress to run end-to-end tests. Execute
Cypress using the following commands:

```sh
yarn start # starts a local server hosting your react app

# run cypress in a different shell
yarn cypress:open
```
