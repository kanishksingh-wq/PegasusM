import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { renderProductGrid } from '../components/ProductGrid'
import type { Product } from '../types'

const makeProduct = (id: string): Product => ({
  id,
  title: `Product ${id}`,
  images: [],
  priceRange: {
    minVariantPrice: { amount: 10, currencyCode: 'USD' },
    maxVariantPrice: { amount: 10, currencyCode: 'USD' },
  },
})

describe('renderProductGrid()', () => {
  it('renders a list of products with listitem roles', () => {
    const products = [makeProduct('1'), makeProduct('2'), makeProduct('3')]
    render(renderProductGrid(products))
    const list = screen.getByRole('list', { name: /products/i })
    const items = within(list).getAllByRole('listitem')
    expect(items.length).toBe(3)
  })
})
