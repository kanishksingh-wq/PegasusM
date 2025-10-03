import { CartItem, Product } from '../types';

export const addToCart = (cart: CartItem[], product: Product): CartItem[] => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    return cart.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...cart, { ...product, quantity: 1 }];
  }
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => {
    return total + parseFloat(item.priceRange.minVariantPrice.amount) * item.quantity;
  }, 0);
};
