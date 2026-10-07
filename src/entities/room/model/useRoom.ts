import { useEffect, useState } from 'react';
import { type Room } from './types';
import { fetchRoomById } from '../api/roomApi';

export const useRoom = (roomId?: string) => {
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState<boolean>(Boolean(roomId));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!roomId) {
            return;
        }

        let isMounted = true;

        fetchRoomById(roomId)
            .then((data) => {
                if (isMounted) {
                    if (data) {
                        setRoom(data);
                        setError(null);
                    } else {
                        setRoom(null);
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

    if (!roomId) {
        return { room: null, loading: false, error: null };
    }

    return { room, loading, error };
};