import React from 'react';
import { Meta } from '@storybook/react';
import { CartView } from './CartView';

export default {
  title: 'Pages/HomePage/CartView',
  component: CartView,
} as Meta;

export const CartViewStory = () => {
  return (
    <div className="w-400">
      <p className="mb-4">
        <em>Add items here from the CatalogView.</em>
      </p>
      <CartView />
    </div>
  );
};
CartViewStory.storyName = 'CartView';
