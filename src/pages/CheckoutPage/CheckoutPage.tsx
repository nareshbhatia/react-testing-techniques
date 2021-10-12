import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../../components';
import { useCreateOrder } from '../../services';
import { CheckoutInfo } from '../../models';
import { CheckoutForm } from './CheckoutForm';
import { CartSummary } from './CartSummary';

export const CheckoutPage = () => {
  const createOrderMutation = useCreateOrder();
  const navigate = useNavigate();

  const handleSubmit = (checkoutInfo: CheckoutInfo) => {
    createOrderMutation.mutate(checkoutInfo);
    navigate('/orders');
  };

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <CheckoutForm onSubmit={handleSubmit} />
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartSummary />
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
