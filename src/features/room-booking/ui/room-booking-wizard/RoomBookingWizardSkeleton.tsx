import { Skeleton } from '@/shared/ui/skeleton'

import wizardStyles from './RoomBookingWizard.module.scss'
import styles from './RoomBookingWizardSkeleton.module.scss'

export const RoomBookingWizardSkeleton = () => {
  return (
    <div
      className={`${wizardStyles.wizardLayout} container`}
      aria-busy="true"
      aria-label="Loading booking form"
    >
      <div className={wizardStyles.wizardLayoutContent}>
        <div className={wizardStyles.wizardMain}>
          <Skeleton variant="light" className={styles.bookingTitle} />

          <div className={styles.calendarWrapper}>
            <div className={styles.calendarNav}>
              <Skeleton variant="light" className={styles.navArrow} />
              <Skeleton variant="light" className={styles.navTitle} />
              <Skeleton variant="light" className={styles.navArrow} />
            </div>

            <div className={styles.weekdaysRow}>
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={`weekday-${i}`} variant="light" className={styles.weekdayCell} />
              ))}
            </div>

            <div className={styles.daysGrid}>
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={`day-${i}`} variant="light" className={styles.dayCell} />
              ))}
            </div>
          </div>

          <div className={styles.timeSection}>
            <Skeleton variant="light" className={styles.timeTitle} />
            <div className={styles.timeSlotsGrid}>
              <Skeleton variant="light" className={styles.timeSlot} />
              <Skeleton variant="light" className={styles.timeSlot} />
              <Skeleton variant="light" className={styles.timeSlot} />
            </div>
          </div>
        </div>

        <aside className={wizardStyles.wizardSidebar}>
          <div className={styles.sidebarInfo}>
            <Skeleton variant="light" className={styles.roomTitle} />
            <div className={styles.descriptionLines}>
              <Skeleton variant="light" className={styles.textLine} />
              <Skeleton variant="light" className={styles.textLine} />
              <Skeleton variant="light" className={styles.textLine} />
              <Skeleton variant="light" className={`${styles.textLine} ${styles.shortTextLine}`} />
            </div>
            <div className={styles.metaRow}>
              <Skeleton variant="light" className={styles.metaPill} />
              <Skeleton variant="light" className={styles.metaPill} />
            </div>
          </div>

          <div className={wizardStyles.wizardControls}>
            <Skeleton variant="light" className={styles.nextButton} />
          </div>
        </aside>
      </div>
    </div>
  )
}
