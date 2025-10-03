import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchProducts } from '../lib/shopify'
import { mockProducts } from '../mock/products'

const originalEnv = { ...import.meta.env }

describe('fetchProducts', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    Object.assign(import.meta.env as any, originalEnv)
  })

  it('returns mock products when mock mode', async () => {
    Object.assign(import.meta.env as any, { VITE_USE_MOCK: 'true' })
    const products = await fetchProducts({ first: 3 })
    expect(products).toHaveLength(3)
    expect(products[0].id).toBe(mockProducts[0].id)
  })

  it('fetches from API and falls back to mock on error', async () => {
    Object.assign(import.meta.env as any, {
      VITE_USE_MOCK: 'false',
      VITE_SHOPIFY_STORE_DOMAIN: 'example.myshopify.com',
      VITE_SHOPIFY_STOREFRONT_TOKEN: 'token',
    })

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      text: async () => 'error',
    } as any)

    const products = await fetchProducts({ first: 2 })
    expect(products).toHaveLength(2)
  })
})
