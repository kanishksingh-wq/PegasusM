import { Product } from '../types'
import { mockProducts } from '../mock/products'

const API_VERSION = '2024-07'

function getEnv() {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
  const useMockEnv = (import.meta.env.VITE_USE_MOCK ?? 'true').toLowerCase()
  const useMock = useMockEnv === 'true' || useMockEnv === '1'
  return { domain, token, useMock }
}

function validateEnv() {
  const { domain, token } = getEnv()
  const hasCreds = Boolean(domain && token)
  return { hasCreds }
}

export function isMockMode(overrides?: { useMock?: boolean }): boolean {
  const env = getEnv()
  const { hasCreds } = validateEnv()
  if (typeof overrides?.useMock === 'boolean') return overrides.useMock
  return env.useMock || !hasCreds
}

const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!, $sortKey: ProductSortKeys) {
    products(first: $first, sortKey: $sortKey) {
      edges {
        node {
          id
          handle
          title
          description
          images(first: 4) { edges { node { id url altText width height } } }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
        }
      }
    }
  }
`

function fromGraphQL(resp: any): Product[] {
  const edges = resp?.data?.products?.edges ?? []
  return edges.map((e: any) => {
    const n = e.node
    const imagesEdges = n?.images?.edges ?? []
    return {
      id: String(n.id),
      handle: n.handle ?? undefined,
      title: n.title ?? 'Untitled product',
      description: n.description ?? null,
      images: imagesEdges.map((ie: any) => ({
        id: String(ie.node.id ?? Math.random()),
        url: String(ie.node.url),
        altText: ie.node.altText ?? null,
        width: typeof ie.node.width === 'number' ? ie.node.width : null,
        height: typeof ie.node.height === 'number' ? ie.node.height : null,
      })),
      priceRange: {
        minVariantPrice: {
          amount: Number(n.priceRange?.minVariantPrice?.amount ?? 0),
          currencyCode: String(n.priceRange?.minVariantPrice?.currencyCode ?? 'USD'),
        },
        maxVariantPrice: {
          amount: Number(n.priceRange?.maxVariantPrice?.amount ?? 0),
          currencyCode: String(n.priceRange?.maxVariantPrice?.currencyCode ?? 'USD'),
        },
      },
    } as Product
  })
}

export type FetchProductsOptions = {
  first?: number
  useMock?: boolean
  signal?: AbortSignal
}

export async function fetchProducts(options: FetchProductsOptions = {}): Promise<Product[]> {
  const { first = 12, useMock: forceMock, signal } = options
  const env = getEnv()
  const shouldUseMock = typeof forceMock === 'boolean' ? forceMock : env.useMock || !validateEnv().hasCreds

  if (shouldUseMock) {
    // Simulate network latency for UX parity
    await new Promise((r) => setTimeout(r, 300))
    return mockProducts.slice(0, first)
  }

  const url = `https://${env.domain}/api/${API_VERSION}/graphql.json`

  const body = JSON.stringify({
    query: PRODUCTS_QUERY,
    variables: { first, sortKey: 'CREATED_AT' },
  })

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12_000)

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': env.token!,
      },
      body,
      signal: signal ?? controller.signal,
    })

    if (!resp.ok) {
      // Attempt graceful mock fallback on 4xx/5xx
      const text = await resp.text().catch(() => '')
      console.error('Shopify API error', resp.status, text)
      return mockProducts.slice(0, first)
    }

    const data = await resp.json()

    if (data.errors) {
      console.error('Shopify GraphQL errors', data.errors)
      return mockProducts.slice(0, first)
    }

    return fromGraphQL(data).slice(0, first)
  } catch (err) {
    if ((err as any)?.name === 'AbortError') {
      console.warn('Shopify request aborted by timeout')
    } else {
      console.error('Shopify request failed', err)
    }
    // Fallback to mock for resilience
    return mockProducts.slice(0, first)
  } finally {
    clearTimeout(timer)
  }
}
