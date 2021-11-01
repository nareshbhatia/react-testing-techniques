import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary, Loading } from '../src/components';
import { EnvProvider } from '../src/contexts';
import '../src/services/AxiosInterceptors';
import '../src/styles/main.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Home'],
    },
  },
};

// Start mock service worker
const { worker } = require('../src/mocks/browser');
worker.start();
worker.printHandlers();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const decorators = [
  (Story: any) => (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Story />
            </Router>
          </QueryClientProvider>
        </EnvProvider>
      </ErrorBoundary>
    </Suspense>
  ),
];
