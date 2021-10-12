import React from 'react';
import { Order } from '../../models';
import { DateUtils } from '../../utils';
import { AddressView } from '../AddressView';
import { HorizontalContainer } from '../Containers';
import { OrderItemList } from './OrderItemList';
import './OrderView.css';

export interface OrderViewProps {
  order: Order;
}

export const OrderView = ({ order }: OrderViewProps) => {
  const { createdAt, items, shippingAddress } = order;

  return (
    <div data-testid="order-view" className="product paper border-paper">
      <HorizontalContainer className="justify-between">
        <AddressView address={shippingAddress} />
        <p className="m-0">{DateUtils.formatISODate(createdAt)}</p>
      </HorizontalContainer>
      <OrderItemList items={items} className="mt-2" />
    </div>
  );
};
