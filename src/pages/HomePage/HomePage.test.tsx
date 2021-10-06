import React from 'react';
import { render } from '../../test/test-utils';
import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  test('renders correctly', async () => {
    const { findByText } = render(<HomePage />);
    expect(await findByText('iMac')).toBeInTheDocument();
    expect(await findByText('Shopping Cart')).toBeInTheDocument();
  });
});
