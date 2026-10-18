import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Surname must be at least 2 characters')
    .max(50, 'Surname must be at most 50 characters'),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number must be at most 20 characters')
    .regex(/^[+\d\s()-]+$/, 'Invalid phone number format'),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
