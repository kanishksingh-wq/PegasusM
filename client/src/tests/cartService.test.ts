import { addToCart, getCartTotal } from '../services/cartService';
import { mockProducts } from '../mockData';
import { CartItem } from '../types';

describe('cartService', () => {
  it('should add a new item to the cart', () => {
    const cart: CartItem[] = [];
    const product = mockProducts[0];
    const newCart = addToCart(cart, product);
    expect(newCart.length).toBe(1);
    expect(newCart[0].quantity).toBe(1);
  });

  it('should increment the quantity of an existing item in the cart', () => {
    const cart: CartItem[] = [{ ...mockProducts[0], quantity: 1 }];
    const product = mockProducts[0];
    const newCart = addToCart(cart, product);
    expect(newCart.length).toBe(1);
    expect(newCart[0].quantity).toBe(2);
  });

  it('should calculate the total price of the cart correctly', () => {
    const cart: CartItem[] = [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 1 },
    ];
    const total = getCartTotal(cart);
    expect(total).toBe(2 * 29.99 + 79.99);
  });
});
