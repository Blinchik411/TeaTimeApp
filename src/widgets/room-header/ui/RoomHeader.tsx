import { useState } from 'react';
import { MobileMenu } from '@/features/mobileMenu'
import { Icon } from '@/shared/ui/Icon';
import { type Room } from '@/entities/room/model/types';
import guestIcon from '@/shared/assets/icons/guest-count.svg';
import styles from './RoomHeader.module.scss';
import {RouterButton} from '@/shared/ui/router-button'
import {Logo} from "@/shared/ui/logo/Logo";

interface RoomHeaderProps {
    room: Room;
}

export const RoomHeader = ({ room }: RoomHeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={`${styles.header} container`}>
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <button
                className={styles.menuButton}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Открыть меню"
            >
                <Icon name="BurgerMenu" width={24} height={24} />
            </button>

            <Logo
                className={styles.headerLogo}
            />

            <div className={`${styles.cardInfo} ${styles.headerInfo}`}>
                <span className={styles.roomPrice}>{room.price}$</span>
                <span className={styles.roomDuration}>{room.duration}min</span>

                <span className={styles.roomGuestCount}>
          {room.maxGuests}
                    <img
                        src={guestIcon}
                        alt={`${room.maxGuests} guests`}
                        aria-hidden="true"
                        className={styles.iconGuests}
                    />
        </span>

                <RouterButton
                    to="/room/$roomId"
                    params={{ roomId: room.id }}
                    variant="headerButton"
                >
                    Book now
                </RouterButton>
            </div>
        </header>
    );
};