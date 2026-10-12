import { RouterButton } from '@/shared/ui/router-button'
import type { RoomPreview } from '../../model/types'
import { RoomDetailsInfo } from '../room-details-info'
import styles from './RoomCard.module.scss'
import { fetchRoomById } from '../../api/roomApi'
import { roomKeys } from '../../model/roomKeys'
import { useQueryClient } from '@tanstack/react-query'

interface RoomCardProps {
  room: RoomPreview
}


export const RoomCard = ({ room }: RoomCardProps) => {


 const queryClient = useQueryClient()

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: roomKeys.byId(room.id),
      queryFn: () => fetchRoomById(room.id),
    })
  }


  return (
    <section className={styles.roomCard}>
      <div className={`${styles.cardContent} container`}>
        <div className={styles.cardLeft}>
          <img
            src={room.previewImageUrl}
            alt={room.title}
            className={styles.cardImage}
            width="619"
            height="575"
            loading="lazy"
          />
        </div>

        <div className={styles.cardRight}>
          <RoomDetailsInfo room={room} />
          <RouterButton to="/room/$roomId" 
          params={{ roomId: room.id }} 
          variant="cardButton"
          onMouseEnter={handlePrefetch}
          >
            Explore Room
          </RouterButton>
        </div>
      </div>
    </section>
  )
}
