import React from 'react';
import mockOrders from '../../mocks/mockOrders.json';
import { render } from '../../test/test-utils';
import { OrderItemList } from './OrderItemList';

describe('<OrderItemList />', () => {
  test('renders correctly', async () => {
    const { asFragment } = render(
      <OrderItemList items={mockOrders[0].items} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
