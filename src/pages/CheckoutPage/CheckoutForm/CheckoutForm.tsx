import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CheckoutInfo } from '../../../models';
import { AddressForm, getAddressSchema } from '../../../components';

export interface CheckoutFormProps {
  onSubmit: (checkoutInfo: CheckoutInfo) => void;
}

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const schema = yup.object().shape({
    shippingAddress: getAddressSchema(),
  });

  const methods = useForm<CheckoutInfo>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>Checkout</h2>
        <AddressForm title="Shipping Address" parentName="shippingAddress" />

        <button className="btn btn-lg btn-secondary mt-2" type="submit">
          Place your order
        </button>
      </form>
    </FormProvider>
  );
};
