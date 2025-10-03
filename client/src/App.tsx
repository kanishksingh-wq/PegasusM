import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from './services/productService';
import { Product } from './types';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { CartProvider, CartContext } from './services/CartContext';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { products: productData, total } = await fetchProducts(searchQuery, currentPage, 10);
        setProducts(productData);
        setTotalPages(Math.ceil(total / 10));
      } catch (err) {
        setError('Failed to fetch products.');
      }
      setLoading(false);
    };

    getProducts();
  }, [searchQuery, currentPage]);

  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <h1>My Shopify Store</h1>
        </header>
        <main>
          <SearchBar onSearch={setSearchQuery} />
          <Cart />
          {loading && <p>Loading products...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <>
              <ProductList products={products} addToCart={cartContext ? cartContext.addToCart : () => {}} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;

