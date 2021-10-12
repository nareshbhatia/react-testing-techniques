import { formatHttpError } from '@http-utils/core';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CheckoutInfo, Order } from '../models';

// ---------- fetchOrders ----------
export const fetchOrders = async (): Promise<Array<Order>> => {
  try {
    const resp = await axios.get('/orders');
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useOrdersQuery = () => {
  return useQuery('orders', fetchOrders);
};

// ---------- createOrder ----------
export const createOrder = async (checkoutInfo: CheckoutInfo) => {
  try {
    const resp = await axios.post('/orders', checkoutInfo);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('cart');
      queryClient.invalidateQueries('orders');
    },
  });
};
