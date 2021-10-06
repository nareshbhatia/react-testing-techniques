import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CheckoutPage, HomePage, NotFoundPage, OrdersPage } from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
