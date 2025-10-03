import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { mockProducts } from '../mockData';

describe('ProductList', () => {
  it('should render a list of products', () => {
    render(<ProductList products={mockProducts} addToCart={() => {}} />);
    const productTitles = screen.getAllByRole('heading');
    expect(productTitles.length).toBe(mockProducts.length);
  });
});
