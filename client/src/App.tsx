import React, { useEffect, useState } from 'react';
import { fetchProducts } from './fetchProducts';
import { mockProducts } from './mockData';
import { Product } from './types';
import ProductList from './cart/ProductList';
import Cart from './cart/Cart';
import { CartProvider } from './cart/CartContext';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        // To use real data, replace mockProducts with the result of fetchProducts()
        // const productData = await fetchProducts();
        // setProducts(productData);

        // Using mock data for now
        setProducts(mockProducts);
      } catch (err) {
        setError('Failed to fetch products.');
      }
      setLoading(false);
    };

    getProducts();
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <h1>My Shopify Store</h1>
        </header>
        <main>
          <Cart />
          {loading && <p>Loading products...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <ProductList products={products} />}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
