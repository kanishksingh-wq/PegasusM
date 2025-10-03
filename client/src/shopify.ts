import { createStorefrontClient } from '@shopify/storefront-api-client';

const client = createStorefrontClient({
  storeDomain: process.env.REACT_APP_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2023-10',
  publicAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

export default client;
