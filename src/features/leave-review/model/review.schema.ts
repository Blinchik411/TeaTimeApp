import { z } from 'zod';

export const reviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    authorName: z.string().trim().min(2, 'Name is too short').max(12, 'Name is too long (max 12 characters)'),
    text: z.string().trim().min(10, 'Review must be at least 10 characters long'),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;