import { useCallback, useEffect, useState } from 'react'
import { type Room } from './types'
import { fetchRoomById } from '../api/roomApi'

export const useRoom = (roomId?: string) => {
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState<boolean>(Boolean(roomId))
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback((id: string) => {
    let isMounted = true

    fetchRoomById(id)
      .then((data) => {
        if (!isMounted) return
        if (data) {
          setRoom(data)
          setError(null)
        } else {
          setRoom(null)
          setError('Комната не найдена')
        }
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
    if (!roomId) {
      return
    }

    return loadData(roomId)
  }, [roomId, loadData])

  const refetch = useCallback(() => {
    if (!roomId) {
      return
    }
    setLoading(true)
    setError(null)
    loadData(roomId)
  }, [roomId, loadData])

  if (!roomId) {
    return { room: null, loading: false, error: null, refetch }
  }

  return { room, loading, error, refetch }
}
