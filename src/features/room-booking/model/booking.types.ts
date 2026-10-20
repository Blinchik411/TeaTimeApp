import type { ContactFormData } from './contact.schema'
import type { PaymentFormData } from './payment.schema'

export interface CreateBookingPayload {
  roomId: string
  date: string
  time: string
  contact: ContactFormData
  payment: PaymentFormData
}

export interface BookingReceipt {
  id: string
  bookingRef: string
  roomId: string
  date: string
  time: string
  contact: ContactFormData
  createdAt: string
}
