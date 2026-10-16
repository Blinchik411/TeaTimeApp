import clsx from 'clsx'

import type { RoomPreview } from '../../model/types'
import { RoomMeta } from '../room-meta'

import styles from './RoomDetailsInfo.module.scss'

interface RoomDetailsInfoProps {
  room: RoomPreview
  showPrice?: boolean
  variant?: 'roomCarousel' | 'roomBooking'
  className?: string
}

export const RoomDetailsInfo = ({
  room,
  showPrice = true,
  variant = 'roomCarousel',
  className = '',
}: RoomDetailsInfoProps) => {
  const containerClasses = clsx(styles.infoWrapper, styles[variant], className)

  return (
    <div className={containerClasses}>
      <h2 className={styles.cardTitle}>{room.title}</h2>
      <p className={styles.cardText}>{room.description}</p>

      <RoomMeta room={room} showPrice={showPrice} variant={variant} className={styles.cardInfo} />
    </div>
  )
}
