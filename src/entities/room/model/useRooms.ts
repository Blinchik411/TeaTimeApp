import { fetchRooms } from '../api/roomApi'
import { useQuery } from '@tanstack/react-query'
import { roomKeys } from './roomKeys'

export const useRooms = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: roomKeys.all,
    queryFn: fetchRooms,
  })

  return { rooms: data ?? [], loading: isLoading, error: error?.message ?? null, refetch }
}
