import { z } from 'zod'

export const paymentSchema = z.object({
  cardholderName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  cardNumber: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, '')) // Удаляем пробелы перед валидацией
    .refine((val) => /^\d{16}$/.test(val), {
      message: 'Card number must be 16 digits',
    }),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format must be MM/YY (e.g. 08/26)'),
  cvc: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
})

export type PaymentFormData = z.infer<typeof paymentSchema>
