import clsx from 'clsx'
import { DayPicker } from '@daypicker/react'
import '@daypicker/react/style.css'
import styles from './DatePicker.module.scss'

interface DatePickerProps {
  selectedDate?: Date
  onSelectDate: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ selectedDate, onSelectDate, className }: DatePickerProps) {
  return (
    <div className={clsx(styles.datePickerContainer, className)}>
      <DayPicker
        animate
        mode="single"
        navLayout="around"
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={{ before: new Date() }}
      />
    </div>
  )
}
