import { fetchRooms } from '../api/roomApi'
import { useQuery } from '@tanstack/react-query'

export const useRooms = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
  })

  return { rooms: data ?? [], loading: isLoading, error: error?.message ?? null, refetch }
}
