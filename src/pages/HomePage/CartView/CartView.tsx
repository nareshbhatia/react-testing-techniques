import React, { Fragment } from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { CartUtils } from '../../../models';
import { HorizontalContainer, Loading } from '../../../components';
import {
  useCartQuery,
  useDeleteItem,
  useSetItemQuantity,
} from '../../../services';
import { StringUtils } from '../../../utils';
import './CartView.css';

export const CartView = () => {
  const { isLoading, isError, error, data: cart } = useCartQuery();
  const deleteItemMutation = useDeleteItem();
  const setItemQuantityMutation = useSetItemQuantity();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, quantity: string) => {
    setItemQuantityMutation.mutate({
      productId,
      quantity: parseInt(quantity, 10),
    });
  };

  const handleDelete = (productId: string) => {
    deleteItemMutation.mutate(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
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

  if (cart === undefined) {
    return (
      <main>
        <h1>Could not fetch the cart</h1>
      </main>
    );
  }

  return (
    <Fragment>
      <HorizontalContainer className="justify-between items-center">
        <h2>Shopping Cart</h2>
        {cart.items.length > 0 ? (
          <button className="btn btn-secondary" onClick={handleCheckout}>
            Checkout
          </button>
        ) : null}
      </HorizontalContainer>
      {cart.items.length === 0 ? (
        <p>Please click on a product to start your order.</p>
      ) : (
        <table data-testid="order-items" className="mt-3">
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td className="text-right">
                  <input
                    data-testid="quantity-input"
                    className="cart__qty"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, e.target.value)
                    }
                  />
                </td>
                <td className="text-right" data-testid="price-cell">
                  {NumberUtils.formatAsMoney(item.price * item.quantity)}
                </td>
                <td className="text-center">
                  <AiTwotoneDelete
                    data-testid="delete-button"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.productId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td className="text-right">
                {NumberUtils.formatAsMoney(CartUtils.total(cart))}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </Fragment>
  );
};
