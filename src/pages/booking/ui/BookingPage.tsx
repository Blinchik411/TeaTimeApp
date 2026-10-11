import { BookingHeader } from '@/widgets/booking-header'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useRoom } from '@/entities/room'
import {
  RoomBookingWizard,
  RoomBookingWizardSkeleton,
  type BookingStep,
} from '@/features/room-booking'
import styles from './BookingPage.module.scss'

export const BookingPage = () => {
  const { roomId, step, date, time } = useSearch({ from: '/booking' })
  const navigate = useNavigate({ from: '/booking' })
  const { room, loading, error, refetch } = useRoom(roomId)

  const handleStepChange = (newStep: BookingStep) => {
    navigate({
      search: (oldSearch) => ({
        ...oldSearch,
        step: newStep,
      }),
    })
  }

  const handleDateChange = (newDate: string) => {
    navigate({
      search: (oldSearch) => ({
        ...oldSearch,
        date: newDate,
      }),
    })
  }

  const handleTimeChange = (newTime: string) => {
    navigate({
      search: (oldSearch) => ({
        ...oldSearch,
        time: newTime,
      }),
    })
  }

  return (
    <div className={styles.bookingPage}>
      <BookingHeader activeStepIndex={step - 1} />

      <main className={styles.mainContent}>
        {loading ? (
          <RoomBookingWizardSkeleton />
        ) : error || !room ? (
          <div className={`container ${styles.errorWrapper}`}>
            <div className={styles.errorCard} role="alert">
              <span className={styles.errorIcon} aria-hidden="true">
                🍵
              </span>
              <h2 className={styles.errorTitle}>Комната не найдена</h2>
              <p className={styles.errorText}>
                {error || 'К сожалению, запрашиваемая комната недоступна для бронирования.'}
              </p>
              <div className={styles.actions}>
                {refetch && (
                  <button type="button" onClick={refetch} className={styles.retryButton}>
                    Попробовать снова
                  </button>
                )}
                <Link to="/" className={styles.homeButton}>
                  На главную
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <RoomBookingWizard
            room={room}
            step={step}
            onStepChange={handleStepChange}
            date={date}
            time={time}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        )}
      </main>
    </div>
  )
}
