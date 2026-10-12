import type { Review } from '@/entities/room'
import { getAvatarUrl } from '@/shared/lib/avatar'
import type { ReviewFormData } from './review.schema'

export const createOptimisticReview = (formData: ReviewFormData): Review => ({
  id: 'temp-' + Date.now(),
  author: formData.authorName,
  rating: formData.rating,
  text: formData.text,
  date: new Date().toISOString(),
  avatarUrl: getAvatarUrl(formData.authorName),
})
