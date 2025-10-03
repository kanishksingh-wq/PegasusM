import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should render the main application and product list', async () => {
    render(<App />);
    expect(screen.getByText('My Shopify Store')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole('heading').length).toBeGreaterThan(1);
    });
  });

  it('should filter products when a search query is entered', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search for products...');
    fireEvent.change(searchInput, { target: { value: 'T-Shirt' } });
    fireEvent.click(screen.getByText('Search'));
    await waitFor(() => {
      expect(screen.getAllByRole('heading').length).toBe(2); // App title + 1 product
    });
  });
});
