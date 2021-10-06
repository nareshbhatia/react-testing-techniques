import React from 'react';
import { Meta } from '@storybook/react';
import { CatalogView } from './CatalogView';

export default {
  title: 'Pages/HomePage/CatalogView',
  component: CatalogView,
} as Meta;

export const CatalogViewStory = () => <CatalogView />;
CatalogViewStory.storyName = 'CatalogView';
