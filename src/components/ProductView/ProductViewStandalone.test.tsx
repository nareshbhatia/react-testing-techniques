import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils';
import { mockCatalog } from '../../mocks/mockCatalog';
import { CartService } from '../../services';
import { Product } from '../../models';
import { ProductViewStandalone } from './ProductViewStandalone';

const product: Product = mockCatalog['apple-imac'];

// automock the entire CartService module
jest.mock('../../services/CartService');

describe('<ProductViewStandalone />', () => {
  test('when clicked, calls addProduct with productId', async () => {
    render(<ProductViewStandalone product={product} />);

    // click on the ProductView
    userEvent.click(screen.getByTestId('product'));

    // expect addProduct to be called
    expect(CartService.addProduct).toBeCalledTimes(1);
    expect(CartService.addProduct).toBeCalledWith(product.id);
  });
});
