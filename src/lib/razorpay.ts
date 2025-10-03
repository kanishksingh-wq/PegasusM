import type { Money } from '../types'

// Minimal global type for Razorpay
declare global {
  interface Window {
    Razorpay?: any
  }
}

function getEnv() {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID
  const useMockEnv = (import.meta.env.VITE_USE_MOCK ?? 'true').toLowerCase()
  const useMock = useMockEnv === 'true' || useMockEnv === '1'
  return { keyId, useMock }
}

export function isRazorpayMockMode(overrides?: { useMock?: boolean }): boolean {
  const env = getEnv()
  if (typeof overrides?.useMock === 'boolean') return overrides.useMock
  return env.useMock || !env.keyId
}

export type InitCheckoutArgs = {
  amountSubunits: number // amount in the smallest currency unit, e.g., paise for INR, cents for USD
  currency: string
  name?: string
  description?: string
  prefill?: { name?: string; email?: string; contact?: string }
  notes?: Record<string, string>
}

export type PaymentSuccess = {
  status: 'success'
  paymentId: string
  orderId?: string
  signature?: string
}

export type PaymentFailure = {
  status: 'failure'
  reason: string
  code?: string
  description?: string
}

export type PaymentResult = PaymentSuccess | PaymentFailure

async function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) return true
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function handlePaymentSuccess(resp: any): PaymentSuccess {
  return {
    status: 'success',
    paymentId: String(resp?.razorpay_payment_id ?? ''),
    orderId: resp?.razorpay_order_id ? String(resp.razorpay_order_id) : undefined,
    signature: resp?.razorpay_signature ? String(resp.razorpay_signature) : undefined,
  }
}

export function handlePaymentFailure(resp: any): PaymentFailure {
  const err = resp?.error ?? resp ?? {}
  return {
    status: 'failure',
    reason: String(err.reason ?? err.description ?? 'Payment failed'),
    code: err.code ? String(err.code) : undefined,
    description: err.description ? String(err.description) : undefined,
  }
}

export async function initRazorpayCheckout(args: InitCheckoutArgs): Promise<PaymentResult> {
  const env = getEnv()
  const mock = isRazorpayMockMode()

  if (mock) {
    // Simulate network + user interaction
    await new Promise((r) => setTimeout(r, 800))
    // 85% success rate in mock
    const success = Math.random() < 0.85
    if (success) {
      return {
        status: 'success',
        paymentId: 'pay_mock_' + Math.random().toString(36).slice(2, 10),
        orderId: 'order_mock_' + Math.random().toString(36).slice(2, 10),
        signature: 'sig_mock_' + Math.random().toString(36).slice(2, 10),
      }
    }
    return {
      status: 'failure',
      reason: 'Mock payment cancelled',
      code: 'MOCK_CANCEL',
      description: 'The mock payment was cancelled by the user',
    }
  }

  const loaded = await loadRazorpayScript()
  if (!loaded || !window.Razorpay || !env.keyId) {
    return { status: 'failure', reason: 'Unable to load Razorpay', code: 'SCRIPT_LOAD' }
  }

  return new Promise<PaymentResult>((resolve) => {
    const rzp = new window.Razorpay({
      key: env.keyId,
      amount: args.amountSubunits,
      currency: args.currency || 'INR',
      name: args.name || 'Pegasus Storefront',
      description: args.description || 'Order Payment',
      notes: args.notes,
      prefill: args.prefill,
      theme: { color: '#2563eb' },
      handler: function (response: any) {
        resolve(handlePaymentSuccess(response))
      },
      modal: {
        ondismiss: function () {
          resolve({ status: 'failure', reason: 'Checkout dismissed', code: 'USER_DISMISS' })
        },
        escape: true,
        confirm_close: true,
        animation: true,
      },
    })

    rzp.on('payment.failed', function (response: any) {
      resolve(handlePaymentFailure(response))
    })

    rzp.open()
  })
}

export function toSubunits(total: Money): { amountSubunits: number; currency: string } {
  const currency = total.currencyCode || 'INR'
  return { amountSubunits: Math.round(total.amount * 100), currency }
}
