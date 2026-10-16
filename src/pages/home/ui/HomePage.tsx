import { useState } from 'react'

import { About } from '@/widgets/about'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { MobileMenu } from '@/widgets/mobile-menu'
import { RoomCarousel, RoomCarouselError, RoomCarouselSkeleton } from '@/widgets/rooms-carousel'
import { useRooms } from '@/entities/room'

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { rooms, loading, error, refetch } = useRooms()

  return (
    <>
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Hero />
      {loading ? (
        <RoomCarouselSkeleton />
      ) : error ? (
        <RoomCarouselError error={error} onRetry={refetch} />
      ) : (
        <RoomCarousel rooms={rooms} />
      )}
      <About />
      <Footer />
    </>
  )
}
