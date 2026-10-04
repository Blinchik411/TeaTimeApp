import { useZodForm } from '@/shared/lib/hooks/useZodForm';
import { reviewSchema, type ReviewFormData } from '../model/review.schema';
import { Button } from '@/shared/ui/button';
import { supabase } from "@/shared/api/supabase";
import styles from './ReviewModal.module.scss';

interface ReviewModalProps {
    roomId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ReviewModal = ({ roomId, isOpen, onClose }: ReviewModalProps) => {

    const handleSuccess = async (data: ReviewFormData) => {
        try {
            const newReview = {
                rating: data.rating,
                text: data.text,
                author: data.authorName,
                room_id: roomId,
                avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.authorName)}&background=random`,
            };

            const { error } = await supabase
                .from('reviews')
                .insert([newReview]);

            if (error) throw error;

            onClose();
        } catch (error) {
            console.error('Ошибка отправки', error);
        }
    };

    const { errors, handleSubmit } = useZodForm(reviewSchema, handleSuccess);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2 className={styles.modalTitle}>Leave a Review</h2>
                    <button type="button" onClick={onClose} className={styles.closeBtn}>×</button>
                </header>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    <div className={styles.field}>
                        <label>Rating</label>
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            defaultValue="5"
                            className={errors.rating ? styles.inputError : ''}
                        />
                        {errors.rating && <span className={styles.error}>{errors.rating}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="authorName"
                            placeholder="Enter your name"
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
                            className={errors.text ? styles.inputError : ''}
                        />
                        {errors.text && <span className={styles.error}>{errors.text}</span>}
                    </div>

                    <div className={styles.actions}>
                        <Button type="submit" variant="bookingButton">
                            Submit Review
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};