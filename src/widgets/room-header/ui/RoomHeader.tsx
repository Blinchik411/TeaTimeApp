import { Icon } from '@/shared/ui/icon';
import { type Room } from '@/entities/room';
import guestIcon from '@/shared/assets/icons/guest-count.svg';
import styles from './RoomHeader.module.scss';
import { RouterButton } from '@/shared/ui/router-button';
import { Logo } from "@/shared/ui/logo";

interface RoomHeaderProps {
    room: Room;
    onOpenMenu?: () => void;
}

export const RoomHeader = ({ room, onOpenMenu }: RoomHeaderProps) => {
    return (
        <header className={`${styles.header} container`}>
            <button
                className={styles.menuButton}
                onClick={onOpenMenu}
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