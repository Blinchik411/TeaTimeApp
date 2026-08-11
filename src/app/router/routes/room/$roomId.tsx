import { createFileRoute } from '@tanstack/react-router';
import { RoomDetailsPage } from '@/pages/room-details/ui/RoomDetailsPage';

export const Route = createFileRoute('/room/$roomId')({
    component: RoomDetailsPage,
});