import React, { useEffect, useState } from 'react';
import { fetchProducts } from './fetchProducts';
import { mockProducts } from './mockData';
import { Product } from './types';
import ProductGrid from './ProductGrid';
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
    <div className="App">
      <header className="App-header">
        <h1>My Shopify Store</h1>
      </header>
      <main>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <ProductGrid products={products} />}
      </main>
    </div>
  );
}

export default App;
