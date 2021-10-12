import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import * as yup from 'yup';
import { App } from './App';
import { ErrorBoundary, Loading } from './components';
import { EnvProvider } from './contexts';
import reportWebVitals from './reportWebVitals';
import { yupLocale } from './utils';
import './services/AxiosInterceptors';
import './styles/main.css';

// Start mock service worker
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
  worker.printHandlers();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// set up yup errors
yup.setLocale(yupLocale);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
            </Router>
          </QueryClientProvider>
        </EnvProvider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
