import { useCart } from '../cart/useCart'

export default function CartButton() {
  const { count, isOpen, open } = useCart()

  const label = `Open cart, ${count} item${count === 1 ? '' : 's'}`

  return (
    <button
      className="btn cart-button"
      onClick={open}
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={isOpen ? 'true' : 'false'}
      title={label}
    >
      <span aria-hidden="true">Cart</span>
      {count > 0 && (
        <span className="cart-badge" aria-live="polite" aria-atomic="true">{count}</span>
      )}
    </button>
  )
}
