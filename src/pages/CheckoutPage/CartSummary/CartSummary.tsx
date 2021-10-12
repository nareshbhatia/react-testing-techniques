import React, { Fragment } from 'react';
import { Loading, OrderItemList } from '../../../components';
import { useCartQuery } from '../../../services';
import { StringUtils } from '../../../utils';

export const CartSummary = () => {
  const { isLoading, isError, error, data: cart } = useCartQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main>
        <h1>{StringUtils.errorToString(error)}</h1>
      </main>
    );
  }

  if (cart === undefined) {
    return (
      <main>
        <h1>Could not fetch the cart</h1>
      </main>
    );
  }

  return (
    <Fragment>
      <h2>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <OrderItemList items={cart.items} className="mt-3" />
      )}
    </Fragment>
  );
};
