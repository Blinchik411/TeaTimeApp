import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { useRoom } from '@/entities/room'
import { RoomHeader } from '@/widgets/room-header'
import { MobileMenu } from '@/widgets/mobile-menu'
import { ExperienceSection } from '@/widgets/experience-section'
import { Footer } from '@/widgets/footer'
import { ReviewSection } from '@/widgets/review-section'
import { ImageSlider } from '@/widgets/image-slider'
import { ErrorCard } from '@/shared/ui/error-card'
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
        ) : error ? (
          <ErrorCard
            icon="⚠️"
            title="Failed to Load Room"
            message={error}
            onRetry={refetch}
          />
        ) : !room ? (
          <ErrorCard
            icon="🍵"
            title="Room Not Found"
            message="Unfortunately, the requested room is unavailable or does not exist."
          />
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
