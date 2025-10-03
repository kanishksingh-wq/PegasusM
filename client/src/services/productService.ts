import { Product } from '../types';
import { mockProducts } from '../mockData';

export const fetchProducts = async (query: string = '', page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number }> => {
  console.log(`Fetching products with query: "${query}", page: ${page}, limit: ${limit}`);
  
  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ products: paginatedProducts, total: filteredProducts.length });
    }, 500);
  });
};
