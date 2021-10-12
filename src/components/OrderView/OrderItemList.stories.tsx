import React from 'react';
import { Meta, Story } from '@storybook/react';
import mockOrders from '../../mocks/mockOrders.json';
import { OrderItemList } from './OrderItemList';

export default {
  title: 'Components/OrderItemList',
  component: OrderItemList,
} as Meta;

const Template: Story = (args) => <OrderItemList items={args.items} />;

export const OrderItemListStory = Template.bind({});
OrderItemListStory.storyName = 'OrderItemList';
OrderItemListStory.args = { items: mockOrders[0].items };
