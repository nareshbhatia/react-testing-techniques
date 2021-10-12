import React from 'react';
import mockOrders from '../../mocks/mockOrders.json';
import { render } from '../../test/test-utils';
import { AddressView } from './AddressView';

describe('<AddressView />', () => {
  test('renders correctly', async () => {
    const { asFragment } = render(
      <AddressView address={mockOrders[0].shippingAddress} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
