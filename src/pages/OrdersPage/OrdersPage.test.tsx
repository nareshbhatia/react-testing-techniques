import React from 'react';
import { render } from '../../test/test-utils';
import { OrdersPage } from './OrdersPage';

describe('<OrdersPage />', () => {
  test('renders correctly', async () => {
    const { findByText } = render(<OrdersPage />);
    expect(await findByText('Your Orders')).toBeInTheDocument();
  });
});
