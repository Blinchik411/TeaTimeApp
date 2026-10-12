import { useEffect, useState, useCallback } from 'react'
import { useZodForm } from '@/shared/lib/hooks/useZodForm'
import { reviewSchema, type ReviewFormData, createOptimisticReview } from '../model'
import { createReview } from '../api/leaveReviewApi'
import { Button } from '@/shared/ui/button'
import { StarRating } from '@/shared/ui/star-rating'
import styles from './ReviewModal.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roomKeys, type Room } from '@/entities/room'

interface ReviewModalProps {
  roomId: string
  isOpen: boolean
  onClose: () => void
}

export const ReviewModal = ({ roomId, isOpen, onClose }: ReviewModalProps) => {
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(5)

  const handleClose = useCallback(() => {
    setRating(5)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: ReviewFormData) => createReview({ ...data, roomId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.byId(roomId) })
    },
    onMutate: async (newReview) => {
      await queryClient.cancelQueries({ queryKey: roomKeys.byId(roomId) })

      const previousRoom = queryClient.getQueryData(roomKeys.byId(roomId))

      queryClient.setQueryData<Room | null>(roomKeys.byId(roomId), (oldRoom) => {
        if (!oldRoom) {
          return oldRoom
        }

        const optimisticReview = createOptimisticReview(newReview)

        return {
          ...oldRoom,
          reviews: [optimisticReview, ...oldRoom.reviews],
        }
      })

      onClose()

      return { previousRoom }
    },
    onError(_err, _newReview, context) {
      // _ - err, newReview are unused here, потом можно сделать чтобы сохраняло в черновик и показывало ошибку
      if (context?.previousRoom) {
        queryClient.setQueryData(roomKeys.byId(roomId), context.previousRoom)
      }
    },
  })

  const handleSuccess = (data: ReviewFormData) => {
    mutate(data)
  }

  const { errors, handleSubmit } = useZodForm(reviewSchema, handleSuccess)

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && <div className={styles.error}>{error.message}</div>}

          <div className={styles.header}>
            <p id="review-modal-title" className={styles.title}>
              Add New Review
            </p>
            <button
              type="button"
              onClick={handleClose}
              className={styles.closeBtn}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className={styles.topRow}>
            <div className={styles.nameField}>
              <label htmlFor="review-author" className={styles.fieldLabel}>
                Your Name
              </label>
              <input
                id="review-author"
                type="text"
                name="authorName"
                placeholder="Enter your name"
                disabled={isPending}
                className={errors.authorName ? styles.inputError : ''}
              />
              {errors.authorName && <span className={styles.error}>{errors.authorName}</span>}
            </div>

            <div className={styles.ratingField}>
              <span className={styles.fieldLabel}>Rating</span>
              <input type="hidden" name="rating" value={rating} />
              <StarRating
                rating={rating}
                onChange={setRating}
                interactive
                size={22}
                disabled={isPending}
              />
              {errors.rating && <span className={styles.error}>{errors.rating}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="review-text" className={styles.fieldLabel}>
              Review
            </label>
            <textarea
              id="review-text"
              name="text"
              placeholder="Share your experience..."
              rows={4}
              disabled={isPending}
              className={errors.text ? styles.inputError : ''}
            />
            {errors.text && <span className={styles.error}>{errors.text}</span>}
          </div>

          <div className={styles.actions}>
            <Button type="submit" variant="bookingButton" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
