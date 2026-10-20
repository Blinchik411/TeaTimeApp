import { useCallback, useEffect, useRef, useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useFocusTrap } from '@/shared/lib/hooks/useFocusTrap'
import { useZodForm } from '@/shared/lib/hooks/useZodForm'
import { Button } from '@/shared/ui/button'
import { StarRating } from '@/shared/ui/star-rating'

import { createReview } from '../api/leaveReviewApi'
import { reviewSchema, type ReviewFormData } from '../model'

import styles from './ReviewModal.module.scss'

interface ReviewModalProps {
  roomId: string
  isOpen: boolean
  onClose: () => void
}

export const ReviewModal = ({ roomId, isOpen, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(5)
  const [values, setValues] = useState({
    authorName: '',
    text: '',
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useFocusTrap(modalRef, isOpen)

  const { mutateAsync, isPending, error, reset } = useMutation({
    mutationFn: (data: ReviewFormData) => createReview({ ...data, roomId }),
    onSuccess: () => {
      setIsSuccess(true)
      setRating(5)
      setValues({ authorName: '', text: '' })
    },
  })

  const handleSuccess = async (data: ReviewFormData) => {
    try {
      await mutateAsync(data)
    } catch {
      // error handled by useMutation state
    }
  }

  const { errors, handleSubmit, setErrors, formId, getFieldId, getErrorId } = useZodForm(
    reviewSchema,
    handleSuccess,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof ReviewFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleClose = useCallback(() => {
    setRating(5)
    setValues({ authorName: '', text: '' })
    setErrors({})
    setIsSuccess(false)
    reset()
    onClose()
  }, [onClose, reset, setErrors])

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

  if (!isOpen) {
    return null
  }

  const titleId = `${formId}-title`

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className={styles.successState}>
            <h3 id={titleId} className={styles.successTitle}>
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
              <p id={titleId} className={styles.title}>
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

            <fieldset disabled={isPending} className={styles.fieldset}>
              <div className={styles.topRow}>
                <div className={styles.nameField}>
                  <label htmlFor={getFieldId('authorName')} className={styles.fieldLabel}>
                    Your Name
                  </label>
                  <input
                    id={getFieldId('authorName')}
                    type="text"
                    name="authorName"
                    value={values.authorName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    maxLength={50}
                    aria-invalid={Boolean(errors.authorName)}
                    aria-describedby={errors.authorName ? getErrorId('authorName') : undefined}
                    className={errors.authorName ? styles.inputError : ''}
                  />
                  {errors.authorName && (
                    <span id={getErrorId('authorName')} className={styles.error} role="alert">
                      {errors.authorName}
                    </span>
                  )}
                </div>

                <div className={styles.ratingField}>
                  <span className={styles.fieldLabel}>Rating</span>
                  <input type="hidden" name="rating" value={rating} />
                  <StarRating rating={rating} onChange={setRating} interactive size={22} />
                  {errors.rating && (
                    <span id={getErrorId('rating')} className={styles.error} role="alert">
                      {errors.rating}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor={getFieldId('text')} className={styles.fieldLabel}>
                  Review
                </label>
                <textarea
                  id={getFieldId('text')}
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  placeholder="Share your experience..."
                  maxLength={1000}
                  rows={4}
                  aria-invalid={Boolean(errors.text)}
                  aria-describedby={errors.text ? getErrorId('text') : undefined}
                  className={errors.text ? styles.inputError : ''}
                />
                {errors.text && (
                  <span id={getErrorId('text')} className={styles.error} role="alert">
                    {errors.text}
                  </span>
                )}
              </div>
            </fieldset>

            <div className={styles.actions}>
              <Button
                type="submit"
                variant="bookingButton"
                isLoading={isPending}
                loadingText="Submitting..."
              >
                Submit Review
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
