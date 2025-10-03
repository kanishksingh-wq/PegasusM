import React from 'react'
import { Product } from '../types'
import { formatMoney } from '../utils/format'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const img = product.images?.[0]
  const priceMin = product.priceRange.minVariantPrice
  const priceMax = product.priceRange.maxVariantPrice
  const isRange = priceMin.amount !== priceMax.amount || priceMin.currencyCode !== priceMax.currencyCode

  const titleId = `title-${product.id}`

  return (
    <article className="card" aria-labelledby={titleId}>
      <a className="card__link" href={product.handle ? `/#/products/${product.handle}` : '#'} aria-label={`View ${product.title}`}>
        <div className="card__media" aria-hidden="true">
          {img ? (
            <img
              src={img.url}
              alt={img.altText ?? product.title}
              width={img.width ?? 800}
              height={img.height ?? 800}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="card__placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="card__body">
          <h3 id={titleId} className="card__title">{product.title}</h3>
          <p className="card__price" aria-label={isRange ? `Price range ${formatMoney(priceMin.amount, priceMin.currencyCode)} to ${formatMoney(priceMax.amount, priceMax.currencyCode)}` : `Price ${formatMoney(priceMin.amount, priceMin.currencyCode)}`}>
            {isRange
              ? `${formatMoney(priceMin.amount, priceMin.currencyCode)} – ${formatMoney(priceMax.amount, priceMax.currencyCode)}`
              : formatMoney(priceMin.amount, priceMin.currencyCode)}
          </p>
        </div>
      </a>
    </article>
  )
}
