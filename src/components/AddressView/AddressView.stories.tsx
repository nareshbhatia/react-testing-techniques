import React from 'react';
import { Meta, Story } from '@storybook/react';
import mockOrders from '../../mocks/mockOrders.json';
import { AddressView } from './AddressView';

export default {
  title: 'Components/AddressView',
  component: AddressView,
} as Meta;

const Template: Story = (args) => <AddressView address={args.address} />;

export const AddressViewStory = Template.bind({});
AddressViewStory.storyName = 'AddressView';
AddressViewStory.args = { address: mockOrders[0].shippingAddress };
