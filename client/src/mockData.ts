import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Stylish T-Shirt',
    handle: 'stylish-t-shirt',
    description: 'A very stylish t-shirt that you will love.',
    images: {
      edges: [
        {
          node: {
            src: 'https://via.placeholder.com/300',
            altText: 'Stylish T-Shirt',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: '29.99',
        currencyCode: 'USD',
      },
    },
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'Comfortable Jeans',
    handle: 'comfortable-jeans',
    description: 'Comfortable jeans for everyday wear.',
    images: {
      edges: [
        {
          node: {
            src: 'https://via.placeholder.com/300',
            altText: 'Comfortable Jeans',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: '79.99',
        currencyCode: 'USD',
      },
    },
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Classic Sneakers',
    handle: 'classic-sneakers',
    description: 'A pair of classic sneakers that never go out of style.',
    images: {
      edges: [
        {
          node: {
            src: 'https://via.placeholder.com/300',
            altText: 'Classic Sneakers',
          },
        },
      ],
    },
    priceRange: {
      minVariantPrice: {
        amount: '59.99',
        currencyCode: 'USD',
      },
    },
  },
];
