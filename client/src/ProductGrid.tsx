import React from 'react';
import { Product } from './types';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
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
          <a href={`/products/${product.handle}`} className="product-link" aria-label={`View details for ${product.title}`}>
            View Details
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
