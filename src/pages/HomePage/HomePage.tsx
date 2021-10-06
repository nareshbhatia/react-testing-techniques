import React from 'react';
import {
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../../components';
import { CatalogView } from './CatalogView';
import { CartView } from './CartView';

export const HomePage = () => {
  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <CatalogView />
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartView />
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
