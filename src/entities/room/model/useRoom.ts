import { useEffect, useState } from 'react';
import { type Room } from './types';
import { fetchRoom } from '@/entities/room/api/roomApi';

export const useRoom = () => {
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchRoom()
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
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { room, loading, error };
};