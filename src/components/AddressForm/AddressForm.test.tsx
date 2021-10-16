import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import mockOrders from '../../mocks/mockOrders.json';
import { CheckoutInfo } from '../../models';
import { yupLocale } from '../../utils';
import { AddressForm, getAddressSchema } from './AddressForm';

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

// ---------- Tests ----------
const handleSubmit = jest.fn();

const address = mockOrders[0].shippingAddress;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<AddressForm />', () => {
  test('displays a validation error if validation fails', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Submit form with only firstName filled
    userEvent.type(screen.getByLabelText('First name'), 'John');
    userEvent.click(screen.getByText('Submit'));

    // Expect to see a validation errors
    expect(await screen.findAllByText('Field is required')).toHaveLength(5);
  });

  test('submits form information if all validations pass', async () => {
    render(<TestForm onSubmit={handleSubmit} />);

    // Enter valid information and submit form
    userEvent.type(screen.getByLabelText('First name'), address.firstName);
    userEvent.type(screen.getByLabelText('Last name'), address.lastName);
    userEvent.type(
      screen.getByLabelText('Company (optional)'),
      address.company
    );
    userEvent.type(screen.getByLabelText('Address'), address.address);
    userEvent.type(screen.getByLabelText('City'), address.city);
    userEvent.type(screen.getByLabelText('State'), address.state);
    userEvent.type(screen.getByLabelText('Zip'), address.zip);
    userEvent.click(screen.getByText('Submit'));

    // Expect handleSubmit to be called with the entered information
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      { shippingAddress: address },
      // ignore the event that is sent to handleSubmit
      expect.anything()
    );
  });
});
