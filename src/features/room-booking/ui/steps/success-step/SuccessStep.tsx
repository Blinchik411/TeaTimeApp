import { useMemo } from 'react'

import type { Room } from '@/entities/room'
import { formatSafeDate } from '@/shared/lib/date'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

import type { ContactFormData } from '../../../model'

import styles from './SuccessStep.module.scss'

interface SuccessStepProps {
  room: Room
  date?: string
  time?: string
  contact?: ContactFormData | null
  onGoHome?: () => void
}

export const SuccessStep = ({ room, date, time, contact, onGoHome }: SuccessStepProps) => {
  const formattedDate = useMemo(
    () => formatSafeDate(date, 'MMMM dd, yyyy', 'Selected Date'),
    [date],
  )

  const bookingRef = useMemo(() => {
    const idPart = (room.id || 'BOOKING')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(-6)
      .toUpperCase()
    return `TEA-${idPart || '749201'}`
  }, [room.id])

  return (
    <section className={styles.successLayout}>
      <div className={styles.successHeader}>
        <div className={styles.iconWrapper}>
          <Icon name="Check" className={styles.checkIcon} />
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.successTitle}>Payment Successful!</h1>
          <span className={styles.successSubtitle}>Booking reference: {bookingRef}</span>
        </div>
      </div>

      <p className={styles.description}>
        Thank you! Your payment has been processed successfully and your tea room reservation is
        confirmed.
      </p>

      <div className={styles.detailsCard}>
        <div className={styles.detailsCardHeader}>
          <span className={styles.orderReference}>Order Details</span>
          <span className={styles.statusBadge}>Paid & Confirmed</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Room</span>
          <span className={styles.detailValue}>{room.title}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Date</span>
          <span className={styles.detailValue}>{formattedDate}</span>
        </div>

        {time && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Time</span>
            <span className={styles.detailValue}>{time}</span>
          </div>
        )}

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Duration</span>
          <span className={styles.detailValue}>{room.duration} min</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Guests</span>
          <span className={styles.detailValue}>{room.maxGuests} guests</span>
        </div>

        {contact && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Guest</span>
            <span className={styles.detailValue}>
              {contact.firstName} {contact.lastName}
            </span>
          </div>
        )}

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Amount Paid</span>
          <span className={styles.totalValue}>${room.price}</span>
        </div>
      </div>

      <div className={styles.notice}>
        A confirmation email with full ceremony instructions and receipt has been sent to{' '}
        {contact?.email ? <strong>{contact.email}</strong> : 'your email address'}. Please arrive 10
        minutes prior to your reserved time.
      </div>

      {onGoHome && (
        <div className={styles.actions}>
          <Button type="button" variant="bookingButton" onClick={onGoHome}>
            Back to Home
          </Button>
        </div>
      )}
    </section>
  )
}
