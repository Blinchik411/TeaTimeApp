import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { MobileMenu } from '@/widgets/MobileMenu';
import { Icon } from '@/shared/ui/Icon';
import { Room } from '@/entities/room/model/types';
import guestIcon from '@/shared/assets/icons/guest-count.svg';
import styles from './RoomHeader.module.scss';

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

            <div className={styles.headerLogo}>
                <Link to="/" className={styles.logo}>
                    <Icon
                        name="SlowTeaHouse"
                        className={styles.headerLogoImage}
                        width={250}
                        height={39}
                    />
                </Link>
            </div>

            <div className={`${styles.cardInfo} ${styles.headerInfo}`}>
                <span className={styles.roomPrice}>{room.price}$</span>
                <span className={styles.roomDuration}>{room.duration}</span>

                <span className={styles.roomGuestCount}>
          {room.maxGuests}
                    <img
                        src={guestIcon}
                        alt={`${room.maxGuests} guests`}
                        aria-hidden="true"
                        className={styles.iconGuests}
                    />
        </span>

                <Link
                    to="/booking"
                    search={{ roomId: room.id }}
                    className="button" /* Предполагаю, что .button у вас глобальный класс */
                >
                    Book now
                </Link>
            </div>
        </header>
    );
};