import { supabase } from '@/shared/api/supabase';
import  { type Room } from '@/entities/room/model/types';

export const fetchRoom = async (): Promise<Room | null> => {
    const { data, error } = await supabase
        .from('tea_rooms')
        .select(`
      id,
      title,
      price,
      duration,
      maxGuests: max_guests,
      description,
      previewImageUrl: preview_image_url,
      detailImageUrl: detail_image_url,
      experience,
      reviews (
        id,
        author,
        date,
        rating,
        text,
        avatarUrl: avatar_url
      )
    `)
        .limit(1); // Берем максимум одну запись

    if (error) {
        console.error('Ошибка при загрузке комнаты из Supabase:', error.message);
        return null;
    }

    // Если массив пустой, возвращаем null, иначе берем первый элемент
    if (!data || data.length === 0) {
        return null;
    }

    return data[0] as Room;
};