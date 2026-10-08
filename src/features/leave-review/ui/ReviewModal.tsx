import { useState } from 'react';
import { useZodForm } from '@/shared/lib/hooks/useZodForm';
import { reviewSchema, type ReviewFormData } from '../model/review.schema';
import { createReview } from '../api/leaveReviewApi';
import { Button } from '@/shared/ui/button';
import styles from './ReviewModal.module.scss';

interface ReviewModalProps {
    roomId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const ReviewModal = ({ roomId, isOpen, onClose, onSuccess }: ReviewModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSuccess = async (data: ReviewFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await createReview({
                ...data,
                roomId,
            });

            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Ошибка отправки отзыва:', error);
            setSubmitError(error instanceof Error ? error.message : 'Не удалось отправить отзыв');
        } finally {
            setIsSubmitting(false);
        }
    };

    const { errors, handleSubmit } = useZodForm(reviewSchema, handleSuccess);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    {submitError && <div className={styles.error
                    }>{submitError}</div>}
                
                    <div className={styles.header}>
                        <p className={styles.title}>Add New Review </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.closeBtn}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>
                    <div className={styles.field}>
                        <label>Rating</label>
                        <div className={styles.ratingInputWrapper}>
                            <input
                                type="number"
                                name="rating"
                                min="1"
                                max="5"
                                defaultValue="5"
                                disabled={isSubmitting}
                                className={errors.rating ? styles.inputError : ''}
                            />
                        </div>
                        {errors.rating && <span className={styles.error}>{errors.rating}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="authorName"
                            placeholder="Enter your name"
                            disabled={isSubmitting}
                            className={errors.authorName ? styles.inputError : ''}
                        />
                        {errors.authorName && <span className={styles.error}>{errors.authorName}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Review</label>
                        <textarea
                            name="text"
                            placeholder="Share your experience..."
                            rows={4}
                            disabled={isSubmitting}
                            className={errors.text ? styles.inputError : ''}
                        />
                        {errors.text && <span className={styles.error}>{errors.text}</span>}
                    </div>

                    <div className={styles.actions}>
                        <Button type="submit" variant="bookingButton" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};