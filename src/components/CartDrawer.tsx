import { useEffect, useRef, useState } from 'react'
import { useCart } from '../cart/useCart'
import { formatMoney } from '../utils/format'
import { initRazorpayCheckout, toSubunits } from '../lib/razorpay'

export default function CartDrawer() {
  const { items, total, isOpen, close, setQuantity, removeItem, count, clear } = useCart()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failure'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      // move focus into the panel
      setTimeout(() => panelRef.current?.focus(), 0)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  async function onCheckout() {
    try {
      setStatus('processing')
      setMessage('Processing payment...')
      const { amountSubunits, currency } = toSubunits(total)
      const result = await initRazorpayCheckout({
        amountSubunits,
        currency,
        name: 'Pegasus Storefront',
        description: `${count} item${count === 1 ? '' : 's'}`,
      })
      if (result.status === 'success') {
        setStatus('success')
        setMessage('Payment successful. Thank you!')
        clear()
      } else {
        setStatus('failure')
        setMessage(result.reason || 'Payment failed')
      }
    } catch (err) {
      setStatus('failure')
      setMessage('Payment could not be initiated')
    }
  }

  if (!isOpen) return null

  const titleId = 'cart-title'
  const descId = 'cart-desc'

  return (
    <div className="drawer" role="presentation">
      <div className="drawer__overlay" aria-hidden="true" onClick={close} />
      <div
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="drawer__header">
          <h2 id={titleId}>Your cart</h2>
          <button className="btn" onClick={close} aria-label="Close cart">Close</button>
        </header>

        <p id={descId} className="drawer__summary">
          {count} item{count === 1 ? '' : 's'} · {formatMoney(total.amount, total.currencyCode)}
        </p>

        {status !== 'idle' && (
          <div className={`alert ${status === 'failure' ? 'alert--error' : ''}`} role={status === 'failure' ? 'alert' : 'status'} aria-live="polite">
            <div>{message}</div>
          </div>
        )}

        <div className="drawer__body" role="list" aria-label="Cart items">
          {items.length === 0 ? (
            <div role="note">Your cart is empty.</div>
          ) : (
            items.map((i) => (
              <div key={i.productId} role="listitem" className="cart-item">
                <div className="cart-item__media" aria-hidden="true">
                  {i.image ? (
                    <img
                      src={i.image.url}
                      alt={i.image.altText ?? i.title}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="cart-item__placeholder" />)
                  }
                </div>
                <div className="cart-item__content">
                  <div className="cart-item__title">{i.title}</div>
                  <div className="cart-item__meta">{formatMoney(i.price.amount, i.price.currencyCode)}</div>
                  <div className="cart-item__controls">
                    <label className="sr-only" htmlFor={`qty-${i.productId}`}>Quantity</label>
                    <div className="qty">
                      <button className="qty__btn" aria-label={`Decrease quantity of ${i.title}`} onClick={() => setQuantity(i.productId, Math.max(0, i.quantity - 1))}>−</button>
                      <input
                        id={`qty-${i.productId}`}
                        className="qty__input"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={i.quantity}
                        onChange={(e) => setQuantity(i.productId, Number(e.target.value))}
                        aria-label={`Quantity of ${i.title}`}
                      />
                      <button className="qty__btn" aria-label={`Increase quantity of ${i.title}`} onClick={() => setQuantity(i.productId, i.quantity + 1)}>+</button>
                    </div>
                    <button className="link" onClick={() => removeItem(i.productId)} aria-label={`Remove ${i.title} from cart`}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="drawer__footer">
          <div className="drawer__total">
            <span className="muted">Total</span>
            <strong>{formatMoney(total.amount, total.currencyCode)}</strong>
          </div>
          <button
            className="btn btn--primary"
            disabled={items.length === 0 || status === 'processing'}
            onClick={onCheckout}
            aria-label={status === 'processing' ? 'Processing payment' : 'Proceed to checkout'}
            aria-busy={status === 'processing' ? 'true' : 'false'}
          >
            {status === 'processing' ? 'Processing…' : 'Checkout'}
          </button>
        </footer>
      </div>
    </div>
  )
}
