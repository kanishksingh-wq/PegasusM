import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, getCartTotal } = useCart();

  return (
    <div className="cart" aria-label="Shopping cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>{item.quantity} x {item.priceRange.minVariantPrice.amount}</span>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: {getCartTotal().toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
