import { Icon } from '../../icon'
import styles from './StarRating.module.scss'

interface StarRatingProps {
  rating: number
}

export const StarRating = ({ rating }: StarRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating)

  return (
    <div className={styles.cardRating} aria-label={`Rating: ${rating} out of 5`}>
      {stars.map((isFilled, index) => (
        <Icon
          key={index}
          name="FilledStar"
          width={16}
          height={16}
          className={isFilled ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </div>
  )
}
