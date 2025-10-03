import { Product } from '../types'
import ProductCard from './ProductCard'

export type ProductGridProps = {
  products: Product[]
  ariaLabel?: string
}

export function renderProductGrid(products: Product[]) {
  return (
    <div className="product-grid" role="list" aria-label="Products">
      {products.map((p) => (
        <div key={p.id} role="listitem" className="product-grid__item">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}

export default function ProductGrid({ products, ariaLabel = 'Products' }: ProductGridProps) {
  return (
    <div className="product-grid" role="list" aria-label={ariaLabel}>
      {products.map((p) => (
        <div key={p.id} role="listitem" className="product-grid__item">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
