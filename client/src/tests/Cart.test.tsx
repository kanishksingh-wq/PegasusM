import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../components/Cart';
import { CartContext } from '../services/CartContext';
import { mockProducts } from '../mockData';

describe('Cart', () => {
  it('should display an empty cart message when no items are present', () => {
    render(
      <CartContext.Provider value={{ cart: [], addToCart: () => {}, getCartTotal: () => 0 }}>
        <Cart />
      </CartContext.Provider>
    );
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('should display the cart items and total when items are present', () => {
    const cart = [{ ...mockProducts[0], quantity: 2 }];
    render(
      <CartContext.Provider value={{ cart, addToCart: () => {}, getCartTotal: () => 59.98 }}>
        <Cart />
      </CartContext.Provider>
    );
    expect(screen.getByText('Stylish T-Shirt - 2 x 29.99')).toBeInTheDocument();
    expect(screen.getByText('Total: 59.98')).toBeInTheDocument();
  });
});
