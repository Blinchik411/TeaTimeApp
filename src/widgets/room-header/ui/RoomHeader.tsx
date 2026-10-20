import { RoomMeta, type Room } from '@/entities/room'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Logo } from '@/shared/ui/logo'
import { RouterButton } from '@/shared/ui/router-button'
import { Skeleton } from '@/shared/ui/skeleton'

import styles from './RoomHeader.module.scss'

interface RoomHeaderProps {
  room?: Room | null
  onOpenMenu?: () => void
}

export const RoomHeader = ({ room, onOpenMenu }: RoomHeaderProps) => {
  return (
    <header className={`${styles.header} container`}>
      <Button
        variant="openMobileMenuButton"
        className={styles.menuButton}
        onClick={onOpenMenu}
        aria-label="Open menu"
      >
        <Icon name="BurgerMenu" width={24} height={24} />
      </Button>

      <Logo className={styles.headerLogo} />

      <div className={styles.headerInfo}>
        {room ? (
          <>
            <RoomMeta room={room} variant="roomHeader" />

            <RouterButton
              to={'/booking'}
              search={{ roomId: room.id }}
              preload="intent"
              variant="headerButton"
            >
              Book now
            </RouterButton>
          </>
        ) : (
          <div className={styles.headerSkeletonGroup}>
            <Skeleton variant="dark" width={160} height={28} />
            <Skeleton variant="dark" width={110} height={42} borderRadius={6} />
          </div>
        )}
      </div>
    </header>
  )
}
