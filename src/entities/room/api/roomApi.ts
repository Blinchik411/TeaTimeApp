import { supabase } from '@/shared/api/supabase'
import type { Room, RoomPreview } from '../model/types'

export const fetchRoomById = async (roomId: string): Promise<Room | null> => {


  const { data, error } = await supabase
    .from('tea_rooms')
    .select(
      `
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
        `,
    )
    .eq('id', roomId)
    .maybeSingle()

  if (error) {
    throw new Error(`Supabase error: ${error.message}`)
  }

  return data as Room | null
}

export const fetchRooms = async (): Promise<RoomPreview[]> => {
  const { data, error } = await supabase.from('tea_rooms').select(`
            id,
            title,
            price,
            duration,
            maxGuests: max_guests,
            description,
            previewImageUrl: preview_image_url
        `)

  if (error) {
    throw new Error(`Supabase error: ${error.message}`)
  }

  return (data as RoomPreview[]) || []
}
