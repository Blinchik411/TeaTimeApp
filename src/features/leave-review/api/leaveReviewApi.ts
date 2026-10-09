import { supabase } from '@/shared/api/supabase'
import type { ReviewFormData } from '../model/review.schema'

export interface CreateReviewParams extends ReviewFormData {
  roomId: string
}

export const createReview = async ({ roomId, rating, authorName, text }: CreateReviewParams) => {
  const newReview = {
    rating,
    text,
    author: authorName,
    room_id: roomId,
    avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`,
  }

  const { data, error } = await supabase.from('reviews').insert([newReview]).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
