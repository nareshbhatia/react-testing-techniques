import React from 'react';
import {
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../../components';

export const OrdersPage = () => {
  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <h2>Your Orders</h2>
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <h2>Order</h2>
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
