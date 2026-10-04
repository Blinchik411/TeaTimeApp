import { z } from 'zod';

export const contactSchema = z.object({
    firstName: z.string().trim().min(2, 'Name must be at least 2 characters'),
    lastName: z.string().trim().min(2, 'Surname must be at least 2 characters'),
    phone: z
        .string()
        .trim()
        .min(7, 'Phone number is too short')
        .regex(/^[+\d\s()-]+$/, 'Invalid phone number format'),
    email: z.email('Invalid email address').trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;