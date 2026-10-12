import styles from './RoomCarouselError.module.scss'

interface RoomCarouselErrorProps {
  error?: string | null
  onRetry?: () => void
}

export const RoomCarouselError = ({ error, onRetry }: RoomCarouselErrorProps) => {
  return (
    <div id="rooms" className={`container ${styles.errorContainer}`}>
      <div className={styles.errorCard} role="alert">
        <span className={styles.errorIcon} aria-hidden="true">
          🍵
        </span>
        <h3 className={styles.errorTitle}>Failed to Load Tea Rooms</h3>
        <p className={styles.errorText}>
          {error || 'An error occurred while loading rooms. Please try again.'}
        </p>
        {onRetry && (
          <button type="button" onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
