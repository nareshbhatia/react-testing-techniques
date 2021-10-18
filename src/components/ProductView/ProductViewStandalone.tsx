import React from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { Product } from '../../models';
import { CartService } from '../../services';
import { HorizontalContainer } from '../Containers';
import './ProductView.css';

export interface ProductViewStandaloneProps {
  product: Product;
}

/** Standalone version of ProductView which handles the onClick internally */
export const ProductViewStandalone = ({
  product,
}: ProductViewStandaloneProps) => {
  const { id, name, description, price, photo } = product;

  const handleClick = async () => {
    await CartService.addProduct(id);
  };

  return (
    <HorizontalContainer
      testId="product"
      className="product paper border-paper items-center"
      onClick={handleClick}
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
