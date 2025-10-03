import { fetchProducts } from '../services/productService';
import { mockProducts } from '../mockData';

describe('productService', () => {
  it('should fetch all products without any filters', async () => {
    const { products, total } = await fetchProducts();
    expect(products.length).toBe(3);
    expect(total).toBe(3);
  });

  it('should filter products by a search query', async () => {
    const { products, total } = await fetchProducts('T-Shirt');
    expect(products.length).toBe(1);
    expect(total).toBe(1);
    expect(products[0].title).toBe('Stylish T-Shirt');
  });

  it('should paginate the products correctly', async () => {
    const { products, total } = await fetchProducts('', 1, 2);
    expect(products.length).toBe(2);
    expect(total).toBe(3);
  });
});
