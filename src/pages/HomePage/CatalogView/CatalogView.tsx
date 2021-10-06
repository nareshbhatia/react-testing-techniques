import React, { Fragment } from 'react';
import { Loading, ProductView } from '../../../components';
import { useCatalogQuery, useAddProduct } from '../../../services';
import { StringUtils } from '../../../utils';

export const CatalogView = () => {
  const { isLoading, isError, error, data: catalog } = useCatalogQuery();
  const addProductMutation = useAddProduct();

  const handleProductClicked = (productId: string) => {
    addProductMutation.mutate(productId);
  };

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

  if (catalog === undefined) {
    return (
      <main>
        <h1>Could not fetch catalog</h1>
      </main>
    );
  }

  return (
    <Fragment>
      {Object.values(catalog).map((product) => (
        <ProductView
          key={product.id}
          product={product}
          onClick={handleProductClicked}
        />
      ))}
    </Fragment>
  );
};
