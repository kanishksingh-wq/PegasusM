import { describe, it, expect } from 'vitest'
import { addToCart, getCartTotal, clearCart, updateQuantity, removeFromCart, type Cart } from '../cart/cart'
import type { Product } from '../types'

const product = (id: string, amount: number = 10, currencyCode = 'USD'): Product => ({
  id,
  title: `P-${id}`,
  images: [],
  priceRange: {
    minVariantPrice: { amount, currencyCode },
    maxVariantPrice: { amount, currencyCode },
  },
})

describe('cart functions', () => {
  it('addToCart adds new items and merges quantities', () => {
    let cart: Cart = []
    cart = addToCart(cart, product('1'), 2)
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(2)

    cart = addToCart(cart, product('1'), 3)
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(5)

    cart = addToCart(cart, product('2', 20), 1)
    expect(cart).toHaveLength(2)
  })

  it('getCartTotal returns correct sum', () => {
    let cart: Cart = []
    cart = addToCart(cart, product('1', 5), 2) // 10
    cart = addToCart(cart, product('2', 7), 3) // 21
    const total = getCartTotal(cart)
    expect(total.amount).toBe(31)
    expect(total.currencyCode).toBe('USD')
  })

  it('updateQuantity and removeFromCart work', () => {
    let cart: Cart = []
    cart = addToCart(cart, product('1'), 1)
    const id = cart[0].productId
    cart = updateQuantity(cart, id, 4)
    expect(cart[0].quantity).toBe(4)
    cart = updateQuantity(cart, id, 0)
    expect(cart).toHaveLength(0)

    cart = addToCart(cart, product('2'), 1)
    const id2 = cart[0].productId
    cart = removeFromCart(cart, id2)
    expect(cart).toHaveLength(0)
  })

  it('clearCart empties cart', () => {
    let cart: Cart = []
    cart = addToCart(cart, product('1'), 1)
    cart = clearCart()
    expect(cart).toHaveLength(0)
  })
})
