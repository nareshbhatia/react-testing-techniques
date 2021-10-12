import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Meta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Address, CheckoutInfo } from '../../models';
import { yupLocale } from '../../utils';
import { AddressForm, getAddressSchema } from './AddressForm';
import { AddressView } from '../AddressView';

// set up yup errors
yup.setLocale(yupLocale);

// ---------- TestForm ----------
interface TestFormProps {
  onSubmit: (checkoutInfo: CheckoutInfo) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
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
        <AddressForm title="Shipping Address" parentName="shippingAddress" />
        <button className="btn btn-secondary mt-2" type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}

export default {
  title: 'Components/AddressForm',
  component: AddressForm,
} as Meta;

export const AddressFormStory = () => {
  const [address, setAddress] = useState<Address | undefined>();

  const handleSubmit = (checkoutInfo: CheckoutInfo) => {
    setAddress(checkoutInfo.shippingAddress);
  };

  return (
    <div style={{ width: 320 }}>
      <TestForm onSubmit={handleSubmit} />

      <div className="mt-3">
        <h4>Form value</h4>
        {address !== undefined ? <AddressView address={address} /> : null}
      </div>
    </div>
  );
};
AddressFormStory.storyName = 'AddressForm';
