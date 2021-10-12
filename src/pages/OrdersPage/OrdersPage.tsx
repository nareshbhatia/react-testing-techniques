import React from 'react';
import {
  Header,
  Loading,
  OrderView,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../../components';
import { Order } from '../../models';
import { useOrdersQuery } from '../../services';
import { StringUtils } from '../../utils';

export const OrdersPage = () => {
  const { isLoading, isError, error, data: orders } = useOrdersQuery();

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

  if (orders === undefined) {
    return (
      <main>
        <h1>Could not fetch the orders</h1>
      </main>
    );
  }

  // sort the orders by creation date descending
  const sortedOrders = orders.sort((order1: Order, order2: Order) => {
    const date1 = new Date(order1.createdAt);
    const date2 = new Date(order2.createdAt);
    if (date1 < date2) return 1;
    if (date1 > date2) return -1;
    return 0;
  });

  return (
    <ViewVerticalContainer>
      <Header />
      <ScrollingContainer className="container flex-1 my-2">
        {sortedOrders.length === 0 ? (
          <p>Your have no orders.</p>
        ) : (
          sortedOrders.map((order) => (
            <div key={order.id} className="w-640">
              <OrderView order={order} />
            </div>
          ))
        )}
      </ScrollingContainer>
    </ViewVerticalContainer>
  );
};
