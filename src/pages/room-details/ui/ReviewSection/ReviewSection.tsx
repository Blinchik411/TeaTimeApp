import { Review } from '@/entities/room/model/types';
import { Button } from '@/shared/ui/Button/Button';
import styles from './ReviewSection.module.scss';

interface ReviewsSectionProps {
    reviews: Review[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
    return (
        <section className={styles.reviews}>
            <div className="container">

                {/* Шапка отзывов */}
                <div className={styles.reviewsHeader}>
                    <div className={styles.reviewCounter}>
                        <span id="reviewsLeft">{reviews.length}</span> Reviews
                    </div>

                    <Button variant="secondary" className={styles.reviewButton}>
                        Leave a Review
                    </Button>
                </div>

                {/* Список отзывов */}
                <div className={styles.reviewsList}>
                    {reviews.map((review) => (
                        <article key={review.id} className={styles.reviewItem}>

                            <div className={styles.reviewAvatar}>
                                <img
                                    src={review.avatarUrl}
                                    alt={`${review.author}'s avatar`}
                                    className={styles.reviewImage}
                                    loading="lazy"
                                />
                            </div>

                            <div className={styles.reviewContent}>
                                <div className={styles.reviewMeta}>
                                    <h3 className={styles.cardAuthor}>{review.author}</h3>
                                    <time dateTime={review.date} className={styles.reviewTime}>
                                        {/* Если нужна кастомная форматировка даты, можно сделать это здесь */}
                                        {review.date}
                                    </time>
                                    {/* Заглушка под рейтинг, если решите добавить звездочки */}
                                    <div className={styles.cardRating}>
                                        {/* Пример: {Array(review.rating).fill('⭐')} */}
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    {review.text}
                                </p>
                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
};