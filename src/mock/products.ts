import { Product } from '../types'

export const mockProducts: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'classic-t-shirt',
    title: 'Classic T‑Shirt',
    description: 'Soft cotton crew neck tee. Available in multiple colors.',
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
        altText: 'Folded black cotton t-shirt',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 24, currencyCode: 'USD' },
      maxVariantPrice: { amount: 28, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'denim-jacket',
    title: 'Denim Jacket',
    description: 'Relaxed fit denim jacket with interior pocket.',
    images: [
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1548883345-74fcf1b6d2c8?q=80&w=1200&auto=format&fit=crop',
        altText: 'Blue denim jacket on hanger',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 89, currencyCode: 'USD' },
      maxVariantPrice: { amount: 99, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'sneakers',
    title: 'Everyday Sneakers',
    description: 'Lightweight, breathable, all‑day comfort.',
    images: [
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
        altText: 'White sneakers on a yellow background',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 65, currencyCode: 'USD' },
      maxVariantPrice: { amount: 75, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'canvas-tote',
    title: 'Canvas Tote',
    description: 'Durable canvas tote with inner zip pocket.',
    images: [
      {
        id: 'img4',
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
        altText: 'Beige canvas tote bag on table',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 29, currencyCode: 'USD' },
      maxVariantPrice: { amount: 29, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'hoodie',
    title: 'Fleece Hoodie',
    description: 'Cozy fleece-lined hoodie with kangaroo pocket.',
    images: [
      {
        id: 'img5',
        url: 'https://images.unsplash.com/photo-1539533113208-1c1f96bcd0d5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Gray hoodie on a plain background',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 54, currencyCode: 'USD' },
      maxVariantPrice: { amount: 64, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'cap',
    title: 'Adjustable Cap',
    description: 'Classic six-panel cap with adjustable strap.',
    images: [
      {
        id: 'img6',
        url: 'https://images.unsplash.com/photo-1603252537375-c7fef8a7b4ef?q=80&w=1200&auto=format&fit=crop',
        altText: 'Black baseball cap',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 19, currencyCode: 'USD' },
      maxVariantPrice: { amount: 22, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/7',
    handle: 'socks',
    title: 'Comfy Socks (2‑pack)',
    description: 'Breathable cotton blend socks, pack of 2.',
    images: [
      {
        id: 'img7',
        url: 'https://images.unsplash.com/photo-1520975979651-9f4bd7b5c1a6?q=80&w=1200&auto=format&fit=crop',
        altText: 'Pile of white socks',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 12, currencyCode: 'USD' },
      maxVariantPrice: { amount: 12, currencyCode: 'USD' },
    },
  },
  {
    id: 'gid://shopify/Product/8',
    handle: 'water-bottle',
    title: 'Insulated Water Bottle',
    description: 'Stainless steel bottle keeps drinks cold for 24h.',
    images: [
      {
        id: 'img8',
        url: 'https://images.unsplash.com/photo-1580983553565-989f8f2a12d4?q=80&w=1200&auto=format&fit=crop',
        altText: 'Matte black water bottle',
        width: 1200,
        height: 1200,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: 34, currencyCode: 'USD' },
      maxVariantPrice: { amount: 34, currencyCode: 'USD' },
    },
  },
]
