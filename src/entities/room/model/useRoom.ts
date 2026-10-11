import { fetchRoomById } from '../api/roomApi'
import { useQuery } from '@tanstack/react-query'

export const useRoom = (roomId?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => fetchRoomById(roomId!),
    enabled: Boolean(roomId),
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
