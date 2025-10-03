import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { CartProvider } from './cart/useCart'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root container #root not found')
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
)
