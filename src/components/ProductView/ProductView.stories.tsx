import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { mockCatalog } from '../../mocks/mockCatalog';
import { Product } from '../../models';
import { ProductView } from './ProductView';

const product: Product = mockCatalog['apple-imac'];

export default {
  title: 'Components/ProductView',
  component: ProductView,
} as Meta;

const Template: Story = (args) => (
  <ProductView product={args.product} onClick={action('Product clicked')} />
);

export const ProductViewStory = Template.bind({});
ProductViewStory.storyName = 'ProductView';
ProductViewStory.args = { product };
