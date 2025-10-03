import React, { createContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.priceRange.minVariantPrice.amount) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
