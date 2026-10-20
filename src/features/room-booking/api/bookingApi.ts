import type { TablesInsert } from '@/shared/api/database.types'
import { supabase } from '@/shared/api/supabase'

import type { BookingReceipt, CreateBookingPayload } from '../model/booking.types'

const STORAGE_KEY = 'teatime_latest_booking'

export const createBooking = async (
  payload: CreateBookingPayload,
  delayMs = 0,
): Promise<BookingReceipt> => {
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }

  const randomSuffix = Math.floor(100000 + Math.random() * 900000)
  const roomPrefix = (payload.roomId || 'ROOM')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(-3)
    .toUpperCase()

  const bookingRef = `TEA-${roomPrefix || 'TEA'}-${randomSuffix}`
  const cardDigits = payload.payment.cardNumber.replace(/\D/g, '')
  const cardLastFour = cardDigits.length >= 4 ? cardDigits.slice(-4) : '0000'

  const newBooking: TablesInsert<'bookings'> = {
    booking_ref: bookingRef,
    room_id: payload.roomId,
    booking_date: payload.date,
    booking_time: payload.time,
    first_name: payload.contact.firstName,
    last_name: payload.contact.lastName,
    email: payload.contact.email,
    phone: payload.contact.phone,
    cardholder_name: payload.payment.cardholderName,
    card_last_four: cardLastFour,
    status: 'confirmed',
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select('id')
    .single()

  if (error) {
    throw new Error(error.message || 'Failed to save booking to database')
  }

  const dbId = data ? data.id : `booking-${Date.now()}-${randomSuffix}`

  const receipt: BookingReceipt = {
    id: dbId,
    bookingRef,
    roomId: payload.roomId,
    date: payload.date,
    time: payload.time,
    contact: payload.contact,
    createdAt: new Date().toISOString(),
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(receipt))
  } catch {
    // Ignore storage quota or disabled storage in private mode
  }

  return receipt
}

export const getLatestBookingReceipt = (roomId?: string): BookingReceipt | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as BookingReceipt
    if (roomId && parsed.roomId !== roomId) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export const clearLatestBookingReceipt = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }
}
