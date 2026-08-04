import { Review } from '@/entities/room/model/types';
import { Button } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon';
import styles from './ReviewSection.module.scss';

interface ReviewsSectionProps {
    reviews: Review[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
    return (
        <section className={styles.reviews}>
            <div className="container">

                <div className={styles.reviewsHeader}>
                    <div className={styles.reviewCounter}>
                        <span id="reviewsLeft">{reviews.length}</span> Reviews
                    </div>

                    <Button variant="secondary" className={styles.reviewButton}>
                        Leave a Review
                    </Button>
                </div>

                {reviews.length === 0 ? (
                    <p className={styles.noReviews}>
                        No reviews yet. Be the first to leave one!
                    </p>
                ) : (
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
                                            {review.date}
                                        </time>

                                        <div className={styles.cardRating} aria-label={`Rating: ${review.rating} out of 5`}>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Icon
                                                    key={index}
                                                    name="Star"
                                                    width={16}
                                                    height={16}
                                                    className={
                                                        index < review.rating
                                                            ? styles.starFilled
                                                            : styles.starEmpty
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className={styles.reviewText}>
                                        {review.text}
                                    </p>
                                </div>

                            </article>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};