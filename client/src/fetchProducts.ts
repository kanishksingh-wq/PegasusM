import client from './shopify';
import { Product } from './types';

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const fetchProducts = async (count: number = 10): Promise<Product[]> => {
  try {
    const response: { data: { products: { edges: { node: Product }[] } } } = await client.request(PRODUCTS_QUERY, { variables: { first: count } });
    return response.data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
