import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { BookingPage } from '@/pages/booking'

const bookingSearchSchema = z.object({
  roomId: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  step: z.coerce
    .number()
    .pipe(z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]))
    .catch(1)
    .default(1),
})

export const Route = createFileRoute('/booking')({
  validateSearch: bookingSearchSchema,
  beforeLoad: ({ search }) => {
    if (!search.roomId) {
      throw redirect({ to: '/' })
    }
  },
  component: BookingPage,
})
