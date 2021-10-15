// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { MOCK_API_URL } from './mocks/constants';
import { server } from './mocks/server';

// import AxiosInterceptors, otherwise service calls will fail
import './services/AxiosInterceptors';

// ----- Set API_URL in window environment -----
(window as any)._env_ = { API_URL: MOCK_API_URL };

// ----- Set up Mock Service Worker -----
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
