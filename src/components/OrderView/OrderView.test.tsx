import React from 'react';
import mockOrders from '../../mocks/mockOrders.json';
import { render } from '../../test/test-utils';
import { OrderView } from './OrderView';

describe('<OrderItemList />', () => {
  test('renders correctly', async () => {
    const { getByText } = render(<OrderView order={mockOrders[0]} />);

    // since the child components are tested thoroughly, just look for their presence
    expect(getByText('Elon Musk')).toBeInTheDocument();
    expect(getByText('01/01/2021')).toBeInTheDocument();
    expect(getByText('Total')).toBeInTheDocument();
  });
});
