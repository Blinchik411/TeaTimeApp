import { useCallback, useEffect, useState } from 'react'
import { type RoomPreview } from './types'
import { fetchRooms } from '../api/roomApi'

export const useRooms = () => {
  const [rooms, setRooms] = useState<RoomPreview[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(() => {
    let isMounted = true

    fetchRooms()
      .then((data) => {
        if (!isMounted) return
        setRooms(data)
        setLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    return loadData()
  }, [loadData])

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    loadData()
  }, [loadData])

  return { rooms, loading, error, refetch }
}
