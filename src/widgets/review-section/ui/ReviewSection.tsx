import { useState } from 'react'

import { format, parseISO } from 'date-fns'

import { ReviewModal } from '@/features/leave-review'
import { type Review } from '@/entities/room'
import { Button } from '@/shared/ui/button'
import { List } from '@/shared/ui/list'
import { StarRating } from '@/shared/ui/star-rating'

import styles from './ReviewSection.module.scss'

interface ReviewSectionProps {
  roomId: string
  reviews: Review[]
}

export const ReviewSection = ({ roomId, reviews }: ReviewSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className={styles.reviews}>
      <div className="container">
        <div className={styles.reviewsHeader}>
          <div className={styles.reviewCounter}>
            <span id="reviewsLeft">{reviews.length}</span> Reviews
          </div>

          <Button
            variant="cardButton"
            className={styles.reviewButton}
            onClick={() => setIsModalOpen(true)}
          >
            Leave a Review
          </Button>
        </div>

        <List
          items={reviews}
          keyExtractor={(review) => review.id}
          className={styles.reviewsList}
          emptyFallback={
            <p className={styles.noReviews}>No reviews yet. Be the first to leave one!</p>
          }
          renderItem={(review) => (
            <article className={styles.reviewItem}>
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

                  <StarRating rating={review.rating} />
                  <time dateTime={review.date} className={styles.reviewTime}>
                    {format(parseISO(review.date), 'dd.MM.yy')}
                  </time>
                </div>

                <p className={styles.reviewText}>{review.text}</p>
              </div>
            </article>
          )}
        />
      </div>

      <ReviewModal roomId={roomId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
