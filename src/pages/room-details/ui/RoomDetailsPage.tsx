import { useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { useRoom } from '@/entities/room'
import { RoomHeader } from '@/widgets/room-header'
import { MobileMenu } from '@/widgets/mobile-menu'
import { ExperienceSection } from '@/widgets/experience-section'
import { Footer } from '@/widgets/footer'
import { ReviewSection } from '@/widgets/review-section'
import { ImageSlider } from '@/widgets/image-slider'
import { RoomDetailsSkeleton } from './RoomDetailsSkeleton'
import styles from './RoomDetailsPage.module.scss'

export const RoomDetailsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { roomId } = useParams({ from: '/room/$roomId' })
  const { room, loading, error, refetch } = useRoom(roomId)

  return (
    <div className={styles.pageLayout}>
      <RoomHeader room={room} onOpenMenu={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className={styles.mainContent}>
        {loading ? (
          <RoomDetailsSkeleton />
        ) : error || !room ? (
          <div className={`container ${styles.errorWrapper}`}>
            <div className={styles.errorCard} role="alert">
              <span className={styles.errorIcon} aria-hidden="true">
                🍵
              </span>
              <h2 className={styles.errorTitle}>Комната не найдена</h2>
              <p className={styles.errorText}>
                {error || 'К сожалению, запрашиваемая комната недоступна или не существует.'}
              </p>
              <div className={styles.actions}>
                {refetch && (
                  <button type="button" onClick={refetch} className={styles.retryButton}>
                    Попробовать снова
                  </button>
                )}
                <Link to="/" className={styles.homeButton}>
                  Вернуться на главную
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ImageSlider images={room.detailImageUrl} title={room.title} />
            <ExperienceSection room={room} />
            <ReviewSection reviews={room.reviews} roomId={room.id} />
          </>
        )}
      </main>

      <Footer theme="light" />
    </div>
  )
}
