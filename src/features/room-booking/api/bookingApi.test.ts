import { beforeEach, describe, expect, it, vi } from 'vitest'

import { supabase } from '@/shared/api/supabase'

import type { CreateBookingPayload } from '../model/booking.types'
import { clearLatestBookingReceipt, createBooking, getLatestBookingReceipt } from './bookingApi'

vi.mock('@/shared/api/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

describe('bookingApi', () => {
  const mockInsert = vi.fn()

  beforeEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()

    mockInsert.mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: { id: 'db-booking-uuid-123', created_at: new Date().toISOString() },
          error: null,
        }),
      }),
    })

    vi.mocked(supabase.from).mockReturnValue({
      insert: mockInsert,
    } as unknown as ReturnType<typeof supabase.from>)
  })

  const mockPayload: CreateBookingPayload = {
    roomId: 'room-1',
    date: '2026-11-20',
    time: '14:00',
    contact: {
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '+79991234567',
      email: 'ivan@example.com',
    },
    payment: {
      cardNumber: '1111222233334444',
      cardholderName: 'IVAN IVANOV',
      expiry: '12/28',
      cvc: '123',
    },
  }

  it('должен успешно создавать бронирование и возвращать чек', async () => {
    const receipt = await createBooking(mockPayload, 0)

    expect(receipt).toBeDefined()
    expect(receipt.id).toBe('db-booking-uuid-123')
    expect(receipt.roomId).toBe('room-1')
    expect(receipt.date).toBe('2026-11-20')
    expect(receipt.time).toBe('14:00')
    expect(receipt.bookingRef).toMatch(/^TEA-/)
    expect(receipt.contact.firstName).toBe('Иван')
    expect(mockInsert).toHaveBeenCalledTimes(1)
  })

  it('должен сохранять чек в sessionStorage и считывать через getLatestBookingReceipt', async () => {
    const receipt = await createBooking(mockPayload, 0)

    const saved = getLatestBookingReceipt('room-1')
    expect(saved).toEqual(receipt)
  })

  it('не должен возвращать чек для другой комнаты', async () => {
    await createBooking(mockPayload, 0)

    const saved = getLatestBookingReceipt('room-99')
    expect(saved).toBeNull()
  })

  it('должен корректно очищать сохранённый чек', async () => {
    await createBooking(mockPayload, 0)
    clearLatestBookingReceipt()

    expect(getLatestBookingReceipt('room-1')).toBeNull()
  })

  it('должен выбрасывать ошибку, если Supabase возвращает ошибку', async () => {
    mockInsert.mockReturnValueOnce({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database connection error' },
        }),
      }),
    })

    await expect(createBooking(mockPayload, 0)).rejects.toThrow('Database connection error')
  })
})
