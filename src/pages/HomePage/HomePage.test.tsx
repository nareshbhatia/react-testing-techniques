import React from 'react';
import { render, screen } from '../../test/test-utils';
import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  test('renders correctly', async () => {
    render(<HomePage />);
    expect(await screen.findByText('iMac')).toBeInTheDocument();
    expect(await screen.findByText('Shopping Cart')).toBeInTheDocument();
  });
});
