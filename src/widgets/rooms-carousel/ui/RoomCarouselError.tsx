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
        <h3 className={styles.errorTitle}>Не удалось загрузить чайные комнаты</h3>
        <p className={styles.errorText}>
          {error || 'Произошла ошибка при загрузке комнат. Пожалуйста, попробуйте еще раз.'}
        </p>
        {onRetry && (
          <button type="button" onClick={onRetry} className={styles.retryButton}>
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  )
}
