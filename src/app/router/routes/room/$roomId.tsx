import { createFileRoute } from '@tanstack/react-router';
import { RoomDetailsPage } from '@/pages/room-details';

export const Route = createFileRoute('/room/$roomId')({
    component: RoomDetailsPage,
});