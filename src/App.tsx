import React, { useEffect, useMemo, useState } from 'react'
import ProductGrid from './components/ProductGrid'
import SkeletonCard from './components/SkeletonCard'
import { fetchProducts, isMockMode } from './lib/shopify'
import type { Product } from './types'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const mock = useMemo(() => isMockMode(), [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchProducts({ first: 12, signal: controller.signal })
        if (!active) return
        setProducts(data)
      } catch (err) {
        if (!active) return
        setError('Failed to load products. Please try again.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
      controller.abort()
    }
  }, [reloadKey])

  const handleRetry = () => setReloadKey((k) => k + 1)

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className="header" role="banner">
        <div className="container header__inner">
          <h1 className="header__title">Pegasus Storefront</h1>
          <div className="header__meta" aria-live="polite">
            {mock ? (
              <span className="badge" title="Using mock data for development">Mock data</span>
            ) : (
              <span className="badge badge--ok" title="Live Shopify Storefront API">Live</span>
            )}
          </div>
        </div>
      </header>

      <main id="main-content" className="container" role="main" aria-busy={loading ? 'true' : 'false'}>
        {error && (
          <div role="alert" className="alert alert--error">
            <div>
              <strong>Error:</strong> {error}
            </div>
            <button className="btn" onClick={handleRetry} aria-label="Retry loading products">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="product-grid" role="list" aria-label="Loading products">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} role="listitem" className="product-grid__item">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <small>© {new Date().getFullYear()} Pegasus. Built with React + TypeScript + Vite.</small>
        </div>
      </footer>
    </div>
  )
}
