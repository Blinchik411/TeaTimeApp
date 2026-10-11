import { Skeleton } from '@/shared/ui/skeleton'
import styles from './RoomDetailsSkeleton.module.scss'

export const RoomDetailsSkeleton = () => {
  return (
    <div className={styles.detailsSkeleton} aria-busy="true" aria-label="Загрузка деталей комнаты">
      {/* Скелетон слайдера фотографий */}
      <div className={styles.sliderContainer}>
        <Skeleton variant="dark" className={styles.sliderSkeleton} />
      </div>

      {/* Скелетон секции опыта / бронирования */}
      <section className={styles.experienceSection}>
        <div className="container">
          <div className={styles.experienceRow}>
            <div className={styles.leftColumn}>
              <Skeleton variant="light" className={styles.titleSkeleton} />
              <div className={styles.linesGroup}>
                <Skeleton variant="light" className={styles.line} />
                <Skeleton variant="light" className={`${styles.line} ${styles.medium}`} />
                <Skeleton variant="light" className={styles.line} />
                <Skeleton variant="light" className={`${styles.line} ${styles.short}`} />
              </div>
            </div>

            <div className={styles.rightColumn}>
              <Skeleton variant="light" className={styles.titleSkeleton} />
              <div className={styles.linesGroup}>
                <Skeleton variant="light" className={styles.line} />
                <Skeleton variant="light" className={`${styles.line} ${styles.medium}`} />
                <Skeleton variant="light" className={`${styles.line} ${styles.short}`} />
              </div>
            </div>
          </div>

          <div className={styles.bookingBlock}>
            <Skeleton variant="light" className={styles.titleSkeleton} />
            <Skeleton variant="light" className={`${styles.line} ${styles.medium}`} />
          </div>

          <Skeleton variant="light" className={styles.buttonSkeleton} />
        </div>
      </section>
    </div>
  )
}
