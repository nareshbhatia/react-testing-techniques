import React from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { OrderItemUtils } from '../../models';
import { OrderItem } from '../../models';
import './OrderItemList.css';

export interface OrderItemListProps {
  items: Array<OrderItem>;
  className?: string;
}

export const OrderItemList = ({ items, className }: OrderItemListProps) => {
  return (
    <table data-testid="order-items" className={className}>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} data-testid="order-item">
            <td>{item.productName}</td>
            <td className="order-items__quantity text-right">
              {item.quantity}
            </td>
            <td
              className="order-items__price text-right"
              data-testid="price-cell"
            >
              {NumberUtils.formatAsMoney(OrderItemUtils.totalItem(item))}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td className="text-right">
            {NumberUtils.formatAsMoney(OrderItemUtils.totalItems(items))}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
