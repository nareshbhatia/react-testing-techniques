import { formatHttpError } from '@http-utils/core';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Cart } from '../models';

// ---------- fetchCart ----------
export const fetchCart = async (): Promise<Cart> => {
  try {
    const resp = await axios.get('/cart');
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useCartQuery = () => {
  return useQuery('cart', fetchCart);
};

// ---------- addProduct ----------
export const addProduct = async (productId: string) => {
  try {
    const resp = await axios.post('/cart/items', { productId });
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(addProduct, {
    onSuccess: (data) => {
      // update cart from the response
      queryClient.setQueryData('cart', data);
    },
  });
};

// ---------- deleteItem ----------
export const deleteItem = async (productId: string) => {
  try {
    const resp = await axios.delete(`/cart/items/${productId}`);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteItem, {
    onSuccess: (data) => {
      // update cart from the response
      queryClient.setQueryData('cart', data);
    },
  });
};

// ---------- setItemQuantity ----------
type ItemQuantityInput = { productId: string; quantity: number };

export const setItemQuantity = async ({
  productId,
  quantity,
}: ItemQuantityInput) => {
  try {
    const resp = await axios.patch(`/cart/items/${productId}`, { quantity });
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useSetItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation(setItemQuantity, {
    onSuccess: (data) => {
      // update cart from the response
      queryClient.setQueryData('cart', data);
    },
  });
};

export const CartService = {
  addProduct,
};
