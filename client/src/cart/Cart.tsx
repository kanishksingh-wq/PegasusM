import React, { useState } from 'react';
import { useCart } from './CartContext';
import { initRazorpayCheckout } from '../razorpay';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, getCartTotal } = useCart();
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handlePaymentSuccess = (response: any) => {
    setPaymentStatus('Payment successful!');
    console.log(response);
  };

  const handlePaymentFailure = (error: any) => {
    setPaymentStatus('Payment failed.');
    console.error(error);
  };

  const handleCheckout = () => {
    initRazorpayCheckout(getCartTotal(), handlePaymentSuccess, handlePaymentFailure);
  };

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
          <button onClick={handleCheckout} disabled={cart.length === 0}>
            Checkout
          </button>
          {paymentStatus && <p>{paymentStatus}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
