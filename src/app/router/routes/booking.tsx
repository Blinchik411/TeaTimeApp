import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import {BookingPage} from "@/pages/booking";

const bookingSearchSchema = z.object({
    roomId: z.string().optional(),
    date: z.string().optional(),
});

export const Route = createFileRoute('/booking')({
    validateSearch: (search) => bookingSearchSchema.parse(search),
    component: BookingPage,
});