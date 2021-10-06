import React from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { Product } from '../../models';
import { HorizontalContainer } from '../Containers';
import './ProductView.css';

export interface ProductViewProps {
  product: Product;
  onClick: (productId: string) => void;
}

export const ProductView = ({ product, onClick }: ProductViewProps) => {
  const { id, name, description, price, photo } = product;

  return (
    <HorizontalContainer
      testId="product"
      className="product paper border-paper items-center"
      onClick={() => onClick(id)}
    >
      <img className="product__photo" src={photo} alt={name} />
      <div className="ml-4">
        <h3>{name}</h3>
        <p className="mt-0">{description}</p>
        <p className="mb-0">${NumberUtils.formatAsMoney(price)}</p>
      </div>
    </HorizontalContainer>
  );
};
