import React from 'react';
import { NavLink } from 'react-router-dom';

export const CheckoutPage = () => {
  return (
    <main className="p-2">
      <h1 className="text-primary-500">Checkout</h1>
      <div className="mt-3">
        <NavLink to="/" end>
          ← Back to catalog
        </NavLink>
      </div>
    </main>
  );
};
