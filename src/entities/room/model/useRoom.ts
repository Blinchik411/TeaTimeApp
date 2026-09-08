import { useEffect, useState } from 'react';
import { type Room } from './types';
import { fetchRoomById } from '@/entities/room/api/roomApi';

export const useRoom = (roomId?: string) => {
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        if (!roomId) {
            setRoom(null);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        fetchRoomById(roomId)
            .then((data) => {
                if (isMounted) {
                    if (data) {
                        setRoom(data);
                    } else {
                        setError('Комната не найдена');
                    }
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [roomId]);

    return { room, loading, error };
};