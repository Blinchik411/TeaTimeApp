import { fetchRoomById } from '../api/roomApi'
import { useQuery } from '@tanstack/react-query'
import { roomKeys } from './roomKeys'
import type { Room } from './types'

export const useRoom = <TData = Room | null>(roomId?: string, select?: (room: Room | null) => TData) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: roomKeys.byId(roomId),
    queryFn: () => fetchRoomById(roomId!),
    enabled: Boolean(roomId),
    select,
  })

  return {
    room: data,
    loading: isLoading,
    error: error?.message ?? null,
    refetch: () => {
      void refetch()
    },
  }
}
