import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/test-utils';
import { mockCatalog } from '../../mocks/mockCatalog';
import { Product } from '../../models';
import { ProductView } from './ProductView';

const product: Product = mockCatalog['apple-imac'];
const handleClick = jest.fn();

describe('<ProductView />', () => {
  test('renders correctly', async () => {
    const { asFragment } = render(
      <ProductView product={product} onClick={handleClick} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('when clicked, calls onClick with productId', async () => {
    const { getByTestId } = render(
      <ProductView product={product} onClick={handleClick} />
    );

    // click on the ProductView
    userEvent.click(getByTestId('product'));

    // expect mock handler to be called
    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith(product.id);
  });
});
