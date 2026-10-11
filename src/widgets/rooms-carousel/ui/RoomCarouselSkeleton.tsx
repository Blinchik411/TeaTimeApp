import { RoomCardSkeleton } from '@/entities/room'
import './embla-room.css'

export const RoomCarouselSkeleton = () => {
  return (
    <div id="rooms" className="embla" aria-busy="true" aria-label="Загрузка списка комнат">
      <div className="embla__viewport">
        <div className="embla__container">
          <div className="embla__slide">
            <div className="embla__slide__number">
              <RoomCardSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
