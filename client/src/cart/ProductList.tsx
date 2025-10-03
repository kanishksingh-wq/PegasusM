import React from 'react';
import { Product } from '../types';
import { useCart } from './CartContext';
import '../ProductGrid.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-grid" aria-label="List of products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.images.edges[0]?.node.src}
            alt={product.images.edges[0]?.node.altText || product.title}
            className="product-image"
          />
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">
            {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
          </p>
          <button onClick={() => addToCart(product)} aria-label={`Add ${product.title} to cart`}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
