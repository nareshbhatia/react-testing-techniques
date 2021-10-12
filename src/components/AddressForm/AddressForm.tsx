import React, { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { HorizontalContainer } from '../Containers';
import { TextField } from '../Form';

export const getAddressSchema = () =>
  yup.object().shape({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    company: yup.string(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
  });

export interface AddressFormProps {
  title?: string;

  /** parent name e.g. "shippingAddress" */
  parentName: string;
}

export const AddressForm = ({ title, parentName }: AddressFormProps) => {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  return (
    <Fragment>
      {title !== undefined ? <h3 className="mt-3 mb-3">{title}</h3> : null}
      <div className="mb-2">
        <TextField
          id="firstName"
          {...register(`${parentName}.firstName`)}
          label="First name"
          error={errors[parentName]?.firstName?.message}
        />
      </div>
      <div className="mb-2">
        <TextField
          id="lastName"
          {...register(`${parentName}.lastName`)}
          label="Last name"
          error={errors[parentName]?.lastName?.message}
        />
      </div>

      <div className="mb-2">
        <TextField
          id="company"
          {...register(`${parentName}.company`)}
          label="Company (optional)"
          error={errors[parentName]?.company?.message}
        />
      </div>

      <div className="mb-2">
        <TextField
          id="address"
          {...register(`${parentName}.address`)}
          label="Address"
          error={errors[parentName]?.address?.message}
        />
      </div>

      <HorizontalContainer>
        <div className="mb-2 flex-2">
          <TextField
            id="city"
            {...register(`${parentName}.city`)}
            label="City"
            error={errors[parentName]?.city?.message}
          />
        </div>
        <div className="mb-2 ml-1 flex-1">
          <TextField
            id="state"
            {...register(`${parentName}.state`)}
            label="State"
            error={errors[parentName]?.state?.message}
          />
        </div>
        <div className="ml-1 flex-1">
          <TextField
            id="zip"
            {...register(`${parentName}.zip`)}
            label="Zip"
            error={errors[parentName]?.zip?.message}
          />
        </div>
      </HorizontalContainer>
    </Fragment>
  );
};
