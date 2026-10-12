import { BookingHeader } from '@/widgets/booking-header'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useRoom } from '@/entities/room'
import { ErrorCard } from '@/shared/ui/error-card'
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
      replace: true,
    })
  }

  const handleDateChange = (newDate: string) => {
    navigate({
      search: (oldSearch) => ({
        ...oldSearch,
        date: newDate,
      }),
      replace: true,
      resetScroll: false,
    })
  }

  const handleTimeChange = (newTime: string) => {
    navigate({
      search: (oldSearch) => ({
        ...oldSearch,
        time: newTime,
      }),
      replace: true,
      resetScroll: false,
    })
  }

  return (
    <div className={styles.bookingPage}>
      <BookingHeader activeStepIndex={step - 1} />

      <main className={styles.mainContent}>
        {loading ? (
          <RoomBookingWizardSkeleton />
        ) : error || !room ? (
          <ErrorCard
            icon="🍵"
            title="Room Not Found"
            message={error || 'Unfortunately, the requested room is unavailable for booking.'}
            onRetry={refetch}
          />
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
