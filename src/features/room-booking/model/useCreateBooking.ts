import { useMutation } from '@tanstack/react-query'

import { createBooking } from '../api/bookingApi'
import type { BookingReceipt, CreateBookingPayload } from './booking.types'

export const useCreateBooking = () => {
  return useMutation<BookingReceipt, Error, CreateBookingPayload>({
    mutationFn: (payload) => createBooking(payload),
  })
}
