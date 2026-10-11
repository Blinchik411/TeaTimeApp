import { Skeleton } from '@/shared/ui/skeleton'
import styles from './RoomCardSkeleton.module.scss'

export const RoomCardSkeleton = () => {
  return (
    <section className={styles.roomCardSkeleton} aria-label="Загрузка карточки комнаты">
      <div className={`${styles.cardContent} container`}>
        <div className={styles.cardLeft}>
          <Skeleton variant="light" className={styles.imageSkeleton} />
        </div>

        <div className={styles.cardRight}>
          <Skeleton variant="light" className={styles.titleSkeleton} />

          <div className={styles.textGroup}>
            <Skeleton variant="light" className={styles.textLine} />
            <Skeleton variant="light" className={styles.textLine} />
            <Skeleton variant="light" className={`${styles.textLine} ${styles.short}`} />
          </div>

          <div className={styles.metaGroup}>
            <Skeleton variant="light" className={styles.metaPill} />
            <Skeleton variant="light" className={styles.metaPill} />
            <Skeleton variant="light" className={styles.metaPill} />
          </div>

          <Skeleton variant="light" className={styles.buttonSkeleton} />
        </div>
      </div>
    </section>
  )
}
