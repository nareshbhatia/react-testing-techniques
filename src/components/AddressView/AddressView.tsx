import React from 'react';
import { Address } from '../../models';

export interface AddressViewProps {
  address: Address;
}

export const AddressView = ({ address }: AddressViewProps) => {
  const {
    firstName,
    lastName,
    company,
    address: street,
    city,
    state,
    zip,
  } = address;

  return (
    <div>
      <h3 className="m-0">
        {firstName} {lastName}
      </h3>
      {company !== undefined ? <p className="m-0">{company}</p> : null}
      <p className="m-0">{street}</p>
      <p className="m-0">
        {city}, {state} {zip}
      </p>
    </div>
  );
};
