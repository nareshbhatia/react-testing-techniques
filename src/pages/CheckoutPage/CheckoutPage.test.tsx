import React from 'react';
import { render } from '../../test/test-utils';
import { CheckoutPage } from './CheckoutPage';

describe('<CheckoutPage />', () => {
  test('renders correctly', async () => {
    const { findByText } = render(<CheckoutPage />);
    expect(await findByText('Checkout')).toBeInTheDocument();
  });
});
