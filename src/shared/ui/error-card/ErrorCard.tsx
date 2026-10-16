import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

import styles from './ErrorCard.module.scss'

export interface ErrorCardProps {
  title: string
  message: string
  icon?: string
  onRetry?: () => void
  retryText?: string
  showHome?: boolean
  homeText?: string
  className?: string
}

export const ErrorCard = ({
  title,
  message,
  icon = '🍵',
  onRetry,
  retryText = 'Try Again',
  showHome = true,
  homeText = 'Back to Home',
  className,
}: ErrorCardProps) => {
  return (
    <div className={clsx('container', styles.errorWrapper, className)}>
      <div className={styles.errorCard} role="alert">
        <span className={styles.errorIcon} aria-hidden="true">
          {icon}
        </span>
        <h2 className={styles.errorTitle}>{title}</h2>
        <p className={styles.errorText}>{message}</p>
        <div className={styles.actions}>
          {onRetry && (
            <button type="button" onClick={onRetry} className={styles.retryButton}>
              {retryText}
            </button>
          )}
          {showHome && (
            <Link to="/" className={styles.homeButton}>
              {homeText}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
