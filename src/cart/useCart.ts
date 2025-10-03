import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { Product, Money } from '../types'
import { addToCart as addFn, getCartTotal as totalFn, removeFromCart, updateQuantity, getCartCount, type Cart } from './cart'

const STORAGE_KEY = 'cart:v1'

type CartContextValue = {
  items: Cart
  addToCart: (product: Product, qty?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, qty: number) => void
  clear: () => void
  total: Money
  count: number
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  lastFocusedEl: HTMLElement | null
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function readStorage(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function writeStorage(items: Cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Cart>(() => readStorage())
  const [isOpen, setIsOpen] = useState(false)
  const lastFocusedElRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    writeStorage(items)
  }, [items])

  const addToCart = useCallback((product: Product, qty: number = 1) => {
    setItems((prev) => addFn(prev, product, qty))
  }, [])

  const remove = useCallback((productId: string) => {
    setItems((prev) => removeFromCart(prev, productId))
  }, [])

  const setQuantityCb = useCallback((productId: string, qty: number) => {
    setItems((prev) => updateQuantity(prev, productId, qty))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const total = useMemo(() => totalFn(items), [items])
  const count = useMemo(() => getCartCount(items), [items])

  const open = useCallback(() => {
    lastFocusedElRef.current = (document.activeElement as HTMLElement) ?? null
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    setIsOpen(false)
    const el = lastFocusedElRef.current
    if (el && typeof el.focus === 'function') {
      setTimeout(() => el.focus(), 0)
    }
  }, [])
  const toggle = useCallback(() => (isOpen ? close() : open()), [isOpen, open, close])

  const value: CartContextValue = {
    items,
    addToCart,
    removeItem: remove,
    setQuantity: setQuantityCb,
    clear,
    total,
    count,
    isOpen,
    open,
    close,
    toggle,
    lastFocusedEl: lastFocusedElRef.current,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
