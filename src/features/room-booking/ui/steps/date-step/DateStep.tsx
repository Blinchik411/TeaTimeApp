import { DatePicker } from '@/shared/ui/date-picker'
import { TimePicker } from '@/shared/ui/time-picker'
import { type Room } from '@/entities/room'
import { format } from 'date-fns'
import styles from './DateStep.module.scss'

interface DateStepProps {
  room: Room
  date?: string
  time?: string
  onSelectDate: (date: string) => void
  onSelectTime: (time: string) => void
}

export const DateStep = ({ room, date, time, onSelectDate, onSelectTime }: DateStepProps) => {
  const selectedDate = date ? new Date(date) : undefined
  const bookingTimes = room?.experience.bookingTimes ?? []

  const handleSelectDate = (newDate: Date | undefined) => {
    if (!newDate) {
      return
    }
    const formattedDate = format(newDate, 'yyyy-MM-dd')
    onSelectDate(formattedDate)
  }

  return (
    <div className={styles.dateLayout}>
      <h2 className={styles.bookingTitle}>Reserve your date</h2>
      <DatePicker
        className={styles.calendar}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      <TimePicker slots={bookingTimes} selectedTime={time} onSelectTime={onSelectTime} />
    </div>
  )
}
