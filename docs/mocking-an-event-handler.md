# Mocking an event handler

> Note: While this section shows some mocking techniques to test components,
> mocking should be avoided if at all possible for reasons stated in the Guiding
> Principles. It is better to combine two or more components in an integration
> test and interact with the components as the user would.

## Scenario 1: Component accepts event handler as a prop

Below is a short snippet from our
[ProductView](../src/components/ProductView/ProductView.tsx) component. Note
that it accepts an `onClick` prop that is called when the component is clicked.

```tsx
export interface ProductViewProps {
  product: Product;
  onClick: (productId: string) => void;
}

export const ProductView = ({ product, onClick }: ProductViewProps) => {
  ...
};
```

How do we test that `onClick` is indeed called when the component is clicked?
One technique is to mock the handler and test whether it is called when the
component is clicked. See below:

```tsx
const handleClick = jest.fn();

test('when clicked, calls onClick with productId', async () => {
  render(<ProductView product={product} onClick={handleClick} />);

  // click on the ProductView
  userEvent.click(screen.getByTestId('product'));

  // expect mock handler to be called
  expect(handleClick).toBeCalledTimes(1);
  expect(handleClick).toBeCalledWith(product.id);
});
```

Note that this is possible only because `onClick` is exposed as a prop. What if
that was not the case and the component handled the click internally?

## Scenario 2: Component handles the event internally

In the example below, `ProductView` handles the click event internally and calls
a service to add the product to the cart.

```tsx
import { CartService } from '../../services';

export interface ProductViewProps {
  product: Product;
}

export const ProductView = ({ product, onClick }: ProductViewProps) => {
  const handleClick = async () => {
    await CartService.addProduct(id);
  };

  return (
    <div testId="product" onClick={handleClick}>
      ...
    </div>
  );
};
```

In this situation, we cannot mock the event handler because it is internal to
the component. However, we know that it calls the CartService. So instead of
mocking the event handler, we can mock the CartService and test that it's
`addProduct()` method is being called. Here's the test:

```tsx
// import CartService module so that we can mock it
import { CartService } from '../../services';

// mock the CartService module
jest.mock('../../services/CartService');

test('when clicked, calls addProduct with productId', async () => {
  render(<ProductView product={product} />);

  // click on the ProductView
  userEvent.click(screen.getByTestId('product'));

  // expect addProduct to be called
  expect(CartService.addProduct).toBeCalledTimes(1);
  expect(CartService.addProduct).toBeCalledWith(product.id);
});
```
