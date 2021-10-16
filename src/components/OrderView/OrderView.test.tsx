import React from 'react';
import mockOrders from '../../mocks/mockOrders.json';
import { render, screen } from '../../test/test-utils';
import { OrderView } from './OrderView';

describe('<OrderItemList />', () => {
  test('renders correctly', async () => {
    render(<OrderView order={mockOrders[0]} />);

    // since the child components are tested thoroughly, just look for their presence
    expect(screen.getByText('Elon Musk')).toBeInTheDocument();
    expect(screen.getByText('01/01/2021')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });
});
