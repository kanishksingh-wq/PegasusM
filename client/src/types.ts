export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: {
      node: {
        src: string;
        altText: string | null;
      };
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}
