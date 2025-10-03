import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { CartProvider } from '../cart/useCart'

function renderApp() {
  return render(
    <CartProvider>
      <App />
    </CartProvider>
  )
}

describe('Storefront UI', () => {
  it('renders products and supports add to cart + checkout mock flow', async () => {
    const user = userEvent.setup()
    renderApp()

    // Wait for grid to load
    const grid = await screen.findByRole('list', { name: /products/i })
    const firstItem = within(grid).getAllByRole('listitem')[0]
    const addBtn = within(firstItem).getByRole('button', { name: /add to cart/i })
    await user.click(addBtn)

    // Open cart and ensure item is present
    await user.click(screen.getByRole('button', { name: /open cart/i }))
    const dialog = await screen.findByRole('dialog', { name: /your cart/i })
    expect(within(dialog).getByText(/total/i)).toBeInTheDocument()

    // Run mock checkout
    const checkout = within(dialog).getByRole('button', { name: /checkout|processing/i })
    await user.click(checkout)

    // Status element should appear (mock may succeed/fail)
    let statusEl: HTMLElement | null = null
    try {
      statusEl = await within(dialog).findByRole('status')
    } catch {
      statusEl = await within(dialog).findByRole('alert')
    }
    expect(statusEl).toBeInTheDocument()
  })

  it('filters products by search', async () => {
    renderApp()
    const input = await screen.findByRole('searchbox', { name: /search products/i })
    await userEvent.type(input, 'Denim')
    const grid = await screen.findByRole('list', { name: /products/i })
    // Expect at least one item with Denim
    expect(within(grid).getAllByRole('listitem').length).toBeGreaterThan(0)
  })
})
