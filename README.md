# Pegasus Storefront (React + TypeScript + Vite)

Accessible, production‑ready storefront scaffold using the Shopify Storefront API with optional mock data.

## Features

- **TypeScript + Vite**: Fast dev, modern build.
- **Mock or Live Data**: Controlled by `VITE_USE_MOCK` or missing credentials.
- **API Layer**: `fetchProducts()` with timeout, error handling, and mock fallback.
- **Accessible UI**: Skip link, focus styles, semantic roles, alt text, reduced motion.
- **Components**: `ProductCard`, `ProductGrid` and `renderProductGrid()` helper.
- **Resilience**: Loading skeletons, retry on error.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables

Copy `.env.example` to `.env` and set values:

```
VITE_SHOPIFY_STORE_DOMAIN=your-shop.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_public_storefront_token
VITE_USE_MOCK=true
```

- `VITE_USE_MOCK`: `true`/`1` to force mock mode. If credentials are missing, mock mode is used automatically.
- The Storefront token is a public token. Do not use Admin API keys in the client. In Shopify, restrict the Storefront token to your domain and minimum scopes.

## Building for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, etc.). Configure environment variables in the hosting platform rather than committing them.

## Code Overview

- `src/lib/shopify.ts`: `fetchProducts()` and `isMockMode()`.
- `src/components/ProductGrid.tsx`: `ProductGrid` and `renderProductGrid()`.
- `src/components/ProductCard.tsx`: Accessible product card.
- `src/components/SkeletonCard.tsx`: Loading placeholder.
- `src/mock/products.ts`: Mock product catalog.
- `src/utils/format.ts`: Currency formatter.

## Security Notes

- Only use the public Shopify Storefront access token in the browser. Never expose Admin API credentials.
- Prefer mock mode in local dev. Ensure `.env` is gitignored.
- Use domain restrictions and minimum scopes for the Storefront token in Shopify.

## Accessibility Notes

- Skip link to `#main-content` for keyboard users.
- Visible `:focus-visible` outlines and adequate color contrast.
- `role=list` / `role=listitem` semantics, `aria-busy` on main while loading.
- Alt text on product images; skeletons marked `aria-hidden`.

## License

MIT
