import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { handlePaymentSuccess, handlePaymentFailure, initRazorpayCheckout, isRazorpayMockMode } from '../lib/razorpay'

const originalEnv = { ...import.meta.env }

describe('razorpay helpers', () => {
  afterEach(() => {
    Object.assign(import.meta.env, originalEnv)
  })

  it('handlePaymentSuccess maps fields', () => {
    const resp = { razorpay_payment_id: 'pid', razorpay_order_id: 'oid', razorpay_signature: 'sig' }
    const s = handlePaymentSuccess(resp)
    expect(s.status).toBe('success')
    expect(s.paymentId).toBe('pid')
    expect(s.orderId).toBe('oid')
    expect(s.signature).toBe('sig')
  })

  it('handlePaymentFailure maps fields', () => {
    const resp = { error: { reason: 'declined', code: 'BAD', description: 'bad card' } }
    const f = handlePaymentFailure(resp)
    expect(f.status).toBe('failure')
    expect(f.reason).toBe('declined')
    expect(f.code).toBe('BAD')
  })

  it('initRazorpayCheckout runs in mock mode when no key', async () => {
    Object.assign(import.meta.env, { VITE_USE_MOCK: 'true', VITE_RAZORPAY_KEY_ID: '' })
    const res = await initRazorpayCheckout({ amountSubunits: 100, currency: 'INR' })
    expect(['success', 'failure']).toContain(res.status)
  })
})
