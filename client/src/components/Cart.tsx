import React, { useContext } from 'react';
import { CartContext } from '../services/CartContext';
import { initRazorpayCheckout } from '../razorpay';
import { CartItem } from '../types';

const Cart: React.FC = () => {
  const context = useContext(CartContext) || {
    cart: [],
    getCartTotal: () => 0,
  };

  const { cart, getCartTotal } = context;

  const handleCheckout = () => {
    initRazorpayCheckout(getCartTotal());
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.id}>
                {item.title} - {item.quantity} x {item.priceRange.minVariantPrice.amount}
              </li>
            ))}
          </ul>
          <p>Total: {getCartTotal()}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
