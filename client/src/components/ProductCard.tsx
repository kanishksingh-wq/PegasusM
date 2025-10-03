import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.images.edges[0]?.node.src} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>
        {product.priceRange.minVariantPrice.amount}{' '}
        {product.priceRange.minVariantPrice.currencyCode}
      </p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
