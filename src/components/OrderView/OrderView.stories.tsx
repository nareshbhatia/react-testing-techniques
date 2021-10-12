import React from 'react';
import { Meta, Story } from '@storybook/react';
import mockOrders from '../../mocks/mockOrders.json';
import { OrderView } from './OrderView';

export default {
  title: 'Components/OrderView',
  component: OrderView,
} as Meta;

const Template: Story = (args) => <OrderView order={args.order} />;

export const OrderViewStory = Template.bind({});
OrderViewStory.storyName = 'OrderView';
OrderViewStory.args = { order: mockOrders[0] };
