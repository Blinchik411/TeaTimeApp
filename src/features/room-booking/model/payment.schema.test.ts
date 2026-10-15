import { paymentSchema } from './payment.schema'

describe('paymentSchema', () => {
  const validPaymentData = {
    cardholderName: 'Ivan Ivanov',
    cardNumber: '1234 5678 1234 5678',
    expiry: '12/25',
    cvc: '123',
  }

  it('должен успешно валидировать корректные данные', () => {
    const result = paymentSchema.safeParse(validPaymentData)
    expect(result.success).toBe(true)
  })

 
  it('должен возвращать ошибку, если месяц в expiry больше 12', () => {
    const result = paymentSchema.safeParse({...validPaymentData, expiry: '13/25'})
    expect(result.success).toBe(false)
    if (!result.success) {
    expect(result.error.issues[0]?.path).toContain('expiry')
    expect(result.error.issues[0]?.message).toBe('Format must be MM/YY (e.g. 08/26)')
    }
  })

  it('должен возвращать ошибку, если номер карты короче 16 цифр', () => {
    const result = paymentSchema.safeParse({...validPaymentData, cardNumber: '123456789012345'})
    expect(result.success).toBe(false)

    if (!result.success) {
    expect(result.error.issues[0]?.path).toContain('cardNumber')
    expect(result.error.issues[0]?.message).toBe('Card number must be 16 digits')
  }
  })

  it('должен возвращать ошибку, если CVC меньше 3 цифр', () => {
    const result = paymentSchema.safeParse({...validPaymentData, cvc: '12'})
    expect(result.success).toBe(false)
      if (!result.success) {
    expect(result.error.issues[0]?.path).toContain('cvc')
    expect(result.error.issues[0]?.message).toBe('CVC must be 3 or 4 digits')
  }
  })
})
