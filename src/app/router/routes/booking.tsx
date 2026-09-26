import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { BookingPage } from "@/pages/booking";

const bookingSearchSchema = z.object({
    roomId: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    step: z.coerce
        .number()
        .min(1)
        .max(3)
        .catch(1)
        .default(1),
});

export const Route = createFileRoute('/booking')({
    validateSearch: (search) => bookingSearchSchema.parse(search),
    component: BookingPage,
});