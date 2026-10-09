import clsx from 'clsx'
import { Icon } from '@/shared/ui/icon'
import type { RoomPreview } from '../../model/types'
import styles from './RoomMeta.module.scss'

export interface RoomMetaProps {
  room: Pick<RoomPreview, 'price' | 'duration' | 'maxGuests'>
  showPrice?: boolean
  variant?: 'roomCarousel' | 'roomBooking' | 'roomHeader'
  className?: string
}

export const RoomMeta = ({
  room,
  showPrice = true,
  variant = 'roomCarousel',
  className = '',
}: RoomMetaProps) => {
  return (
    <div className={clsx(styles.roomMeta, styles[variant], className)}>
      {showPrice && <span className={styles.roomPrice}>{room.price}$</span>}
      <span className={styles.roomDuration}>{room.duration} min</span>
      <span className={styles.roomGuestCount}>
        {room.maxGuests}
        <Icon name="GuestCount" className={styles.iconGuests} />
      </span>
    </div>
  )
}
