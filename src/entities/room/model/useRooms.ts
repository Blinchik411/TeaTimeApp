import { useEffect, useState } from 'react';
import { type RoomPreview } from './types';
import { fetchRooms } from '../api/roomApi';

export const useRooms = () => {
    const [rooms, setRooms] = useState<RoomPreview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        fetchRooms()
            .then((data) => {
                if (isMounted) {
                    setRooms(data);
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
    }, []);

    return { rooms, loading, error };
};