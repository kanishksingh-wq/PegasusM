interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export const handlePaymentSuccess = (response: any) => {
  console.log('Payment successful:', response);
  // Handle success state here (e.g., show a success message, update order status)
};

export const handlePaymentFailure = (error: any) => {
  console.error('Payment failed:', error);
  // Handle failure state here (e.g., show an error message)
};

export const initRazorpayCheckout = (amount: number) => {
  const options: RazorpayOptions & { modal: { ondismiss: () => void }; payment_failed: (response: any) => void } = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID || '',
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    name: 'My Shopify Store',
    description: 'Test Transaction',
    handler: handlePaymentSuccess,
    prefill: {
      name: 'Test User',
      email: 'test.user@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Test Address',
    },
    theme: {
      color: '#3399cc',
    },
    modal: {
      ondismiss: () => {
        console.log('Checkout form closed');
      },
    },
    payment_failed: handlePaymentFailure,
  };

  const rzp = new window.Razorpay(options);

  rzp.on('payment.failed', handlePaymentFailure);

  rzp.open();
};
