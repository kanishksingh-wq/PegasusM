import type { Product, ProductImage, Money } from '../types'

export type CartItem = {
  productId: string
  title: string
  handle?: string
  image?: ProductImage | null
  price: Money
  quantity: number
}

export type Cart = CartItem[]

function normalizeQuantity(qty?: number) {
  const n = Number.isFinite(qty as number) ? Math.floor(qty as number) : 1
  return Math.max(1, n)
}

/**
 * Pure function: returns a NEW cart with the item added/merged.
 */
export function addToCart(cart: Cart, product: Product, quantity: number = 1): Cart {
  const qty = normalizeQuantity(quantity)
  const unitPrice = product.priceRange.minVariantPrice
  const idx = cart.findIndex(
    (i) => i.productId === product.id && i.price.currencyCode === unitPrice.currencyCode
  )

  if (idx >= 0) {
    const next = [...cart]
    next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
    return next
  }

  const img = product.images?.[0] ?? null
  const item: CartItem = {
    productId: product.id,
    title: product.title,
    handle: product.handle,
    image: img,
    price: unitPrice,
    quantity: qty,
  }

  return [...cart, item]
}

/**
 * Pure function: updates quantity (<=0 removes). Returns NEW cart.
 */
export function updateQuantity(cart: Cart, productId: string, quantity: number): Cart {
  const qty = Math.floor(quantity)
  const idx = cart.findIndex((i) => i.productId === productId)
  if (idx < 0) return cart
  if (qty <= 0) return cart.filter((i) => i.productId !== productId)
  const next = [...cart]
  next[idx] = { ...next[idx], quantity: qty }
  return next
}

/**
 * Pure function: removes an item by productId. Returns NEW cart.
 */
export function removeFromCart(cart: Cart, productId: string): Cart {
  return cart.filter((i) => i.productId !== productId)
}

/**
 * Pure function: clears the cart.
 */
export function clearCart(): Cart {
  return []
}

/**
 * Gets total quantity across all items.
 */
export function getCartCount(cart: Cart): number {
  return cart.reduce((sum, i) => sum + i.quantity, 0)
}

/**
 * Computes the total price across the cart.
 * If multiple currencies are present, the first item's currency is used for the return value.
 */
export function getCartTotal(cart: Cart): Money {
  const currencyCode = cart[0]?.price.currencyCode ?? 'USD'
  const amount = cart.reduce((sum, i) => sum + i.price.amount * i.quantity, 0)
  return { amount, currencyCode }
}
