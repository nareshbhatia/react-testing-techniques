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
One technique is to mock the handler using
[jest.fn](https://jestjs.io/docs/jest-object#jestfnimplementation) and test
whether it is called when the component is clicked. Here's the
[test](../src/components/ProductView/ProductView.test.tsx#L19-L28):

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

In the example below,
[ProductViewStandalone](../src/components/ProductView/ProductViewStandalone.tsx)
handles the click event internally and calls a service to add the product to the
cart.

```tsx
import { CartService } from '../../services';

export interface ProductViewStandaloneProps {
  product: Product;
}

export const ProductViewStandalone = ({
  product,
}: ProductViewStandaloneProps) => {
  const { id, name, description, price, photo } = product;

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
the component. However, we know that it calls CartService, which is an ES6
module.

### Solution 1: Use jest.mock to mock the entire CartService module

Instead of mocking the event handler, we can mock the entire CartService module.
This can be done using
[jest.mock](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options)
and then test that it's `addProduct()` method is being called. Here's the
[test](../src/components/ProductView/ProductViewStandalone.test.tsx):

```tsx
// import CartService module so that we can mock it
import { CartService } from '../../services';

// automock the entire CartService module
jest.mock('../../services/CartService');

test('when clicked, calls addProduct with productId', async () => {
  render(<ProductViewStandalone product={product} />);

  // click on the ProductView
  userEvent.click(screen.getByTestId('product'));

  // expect addProduct to be called
  expect(CartService.addProduct).toBeCalledTimes(1);
  expect(CartService.addProduct).toBeCalledWith(product.id);
});
```

### Solution 2: Use jest.mock with an explicit module implementation

This is same as solution 1, except that we provide an explicit module
implementation instead of automocking the module. For example:

```ts
const mockAddProduct = jest.fn();

// mock the CartService module and provide an implementation
jest.mock('../../services/CartService', () => ({
  // module implementation returns a CartService with the addProduct() method
  CartService: {
    addProduct: async (productId: string): Promise<Cart> => {
      // call mock function with productId to check later in test
      mockAddProduct(productId);
      return {
        items: [{ productId, productName: 'iMac', price: 1299, quantity: 1 }],
      };
    },
  },
}));

test('when clicked, calls onClick with productId', async () => {
  render(<ProductViewStandalone product={product} />);

  // click on the ProductView
  userEvent.click(screen.getByTestId('product'));

  // expect addProduct to be called
  expect(mockAddProduct).toBeCalledTimes(1);
  expect(mockAddProduct).toBeCalledWith(product.id);
});
```

### Solution 3: Use jest.spyOn to mock an individual method

In this approach we only mock one function in the CartService module. This is
done using
[jest.spyOn](https://jestjs.io/docs/jest-object#jestspyonobject-methodname).
`jest.synOn` creates a mock function similar to `jest.fn` but also tracks calls
to the specified method. For example:

```tsx
// import CartService module so that we can mock it
import { CartService } from '../../services';

test('when clicked, calls onClick with productId', async () => {
  const spyAddProduct = jest.spyOn(CartService, 'addProduct');

  render(<ProductViewStandalone product={product} />);

  // click on the ProductView
  userEvent.click(screen.getByTestId('product'));

  // expect spyAddProduct to be called
  expect(spyAddProduct).toBeCalledTimes(1);
  expect(spyAddProduct).toBeCalledWith(product.id);
});
```
