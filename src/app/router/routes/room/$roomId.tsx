import { createFileRoute } from '@tanstack/react-router'

import { RoomDetailsPage } from '@/pages/room-details'
import { fetchRoomById, roomKeys } from '@/entities/room'

export const Route = createFileRoute('/room/$roomId')({
  loader: ({ context: { queryClient }, params: { roomId } }) =>
    queryClient
      .query({
        queryKey: roomKeys.byId(roomId),
        queryFn: () => fetchRoomById(roomId),
      })
      .catch(() => {}),
  component: RoomDetailsPage,
})
