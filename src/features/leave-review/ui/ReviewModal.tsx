import { useEffect, useState, useCallback } from 'react'
import { useZodForm } from '@/shared/lib/hooks/useZodForm'
import { reviewSchema, type ReviewFormData } from '../model'
import { createReview } from '../api/leaveReviewApi'
import { Button } from '@/shared/ui/button'
import { StarRating } from '@/shared/ui/star-rating'
import styles from './ReviewModal.module.scss'
import { useMutation } from '@tanstack/react-query'

interface ReviewModalProps {
  roomId: string
  isOpen: boolean
  onClose: () => void
}

export const ReviewModal = ({ roomId, isOpen, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(5)
  const [isSuccess, setIsSuccess] = useState(false)

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: (data: ReviewFormData) => createReview({ ...data, roomId }),
    onSuccess: () => {
      setIsSuccess(true)
    },
  })

  const handleClose = useCallback(() => {
    setRating(5)
    setIsSuccess(false)
    reset()
    onClose()
  }, [onClose, reset])

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
        {isSuccess ? (
          <div className={styles.successState}>
            <h3 id="review-modal-title" className={styles.successTitle}>
              Thank You!
            </h3>
            <p className={styles.successMessage}>
              Your review has been submitted and will appear on the website once approved by our tea
              master.
            </p>
            <Button variant="bookingButton" onClick={handleClose}>
              Got it
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
