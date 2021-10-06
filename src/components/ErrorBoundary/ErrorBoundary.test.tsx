import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

beforeEach(() => {
  // When an error is thrown a bunch of console.errors are called even though
  // the error boundary handles the error. This makes the test output noisy,
  // so we'll mock out console.error
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

const goodBoyText = 'I am a good boy';
const badBoyText = 'I am a bad boy';

interface ChildProps {
  shouldThrow?: boolean;
}

const Child = ({ shouldThrow }: ChildProps) => {
  if (shouldThrow) {
    throw new Error(badBoyText);
  } else {
    return <div>{goodBoyText}</div>;
  }
};

describe('<ErrorBoundary />', () => {
  test('renders its child when there is no error', () => {
    const { queryByText } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    expect(queryByText(goodBoyText)).toBeInTheDocument();
    expect(queryByText(badBoyText)).not.toBeInTheDocument();

    // By mocking out console.error we may inadvertently miss out on
    // logs due to real errors. Let's reduce that likelihood by adding
    // an assertion for how frequently console.error should be called.
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  test('renders the fallback UI when the child throws an error', () => {
    const { queryByText } = render(
      <ErrorBoundary>
        <Child shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(queryByText(goodBoyText)).not.toBeInTheDocument();
    expect(queryByText(badBoyText)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  test('logs the error when the child throws an error', () => {
    const logError = jest.fn();

    const { queryByText } = render(
      <ErrorBoundary logError={logError}>
        <Child shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(queryByText(goodBoyText)).not.toBeInTheDocument();
    expect(queryByText(badBoyText)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(logError).toHaveBeenCalledTimes(1);
  });
});
