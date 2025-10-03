/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_STORE_DOMAIN?: string
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN?: string
  readonly VITE_USE_MOCK?: string
  readonly VITE_RAZORPAY_KEY_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
