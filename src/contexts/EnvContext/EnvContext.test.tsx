import React from 'react';
import { render } from '@testing-library/react';
import { EnvProvider, useEnv } from './EnvContext';

// Set username in window environment
(window as any)._env_ = {
  USERNAME: 'John Smith',
};

const Child = () => {
  const env = useEnv();
  const username = env.get('USERNAME');
  return <div>Welcome {username}</div>;
};

describe('EnvContext', () => {
  it('return value if environment variable exists', () => {
    const { getByText } = render(
      <EnvProvider>
        <Child />
      </EnvProvider>
    );
    expect(getByText('Welcome John Smith')).toBeInTheDocument();
  });
});
