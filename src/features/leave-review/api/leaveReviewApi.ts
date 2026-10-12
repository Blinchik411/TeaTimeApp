import { supabase } from '@/shared/api/supabase'
import { getAvatarUrl } from '@/shared/lib/avatar'
import type { ReviewFormData } from '../model/review.schema'
import type { TablesInsert } from '@/shared/api/database.types'

export interface CreateReviewParams extends ReviewFormData {
  roomId: string
}

export const createReview = async ({ roomId, rating, authorName, text }: CreateReviewParams) => {
  const newReview: TablesInsert<'reviews'> = {
    rating,
    text,
    author: authorName,
    room_id: roomId,
    avatar_url: getAvatarUrl(authorName),
  }

  const { error } = await supabase.from('reviews').insert([newReview])

  if (error) {
    throw new Error(error.message)
  }

  return true
}
