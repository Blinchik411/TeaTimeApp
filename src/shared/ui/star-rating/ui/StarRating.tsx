import { useState } from 'react'
import clsx from 'clsx'
import { Icon } from '../../icon'
import styles from './StarRating.module.scss'

export interface StarRatingProps {
  rating: number
  onChange?: (rating: number) => void
  interactive?: boolean
  size?: number
  disabled?: boolean
  className?: string
}

export const StarRating = ({
  rating,
  onChange,
  interactive = false,
  size = 16,
  disabled = false,
  className = '',
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0)

  const currentRating = interactive && hoverRating ? hoverRating : rating

  return (
    <div
      className={clsx(styles.cardRating, className)}
      role={interactive ? 'radiogroup' : undefined}
      aria-label={`Rating: ${rating} out of 5`}
      onMouseLeave={interactive && !disabled ? () => setHoverRating(0) : undefined}
    >
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = starValue <= currentRating

        if (interactive) {
          return (
            <button
              key={starValue}
              type="button"
              className={styles.starBtn}
              onClick={() => onChange?.(starValue)}
              onMouseEnter={() => !disabled && setHoverRating(starValue)}
              aria-label={`Rate ${starValue} of 5 stars`}
              disabled={disabled}
            >
              <Icon
                name={isFilled ? 'FilledStar' : 'EmptyStar'}
                width={size}
                height={size}
                className={isFilled ? styles.starFilled : styles.starEmpty}
              />
            </button>
          )
        }

        return (
          <Icon
            key={starValue}
            name={isFilled ? 'FilledStar' : 'EmptyStar'}
            width={size}
            height={size}
            className={isFilled ? styles.starFilled : styles.starEmpty}
          />
        )
      })}
    </div>
  )
}
