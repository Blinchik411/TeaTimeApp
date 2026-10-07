import { Icon } from '@/shared/ui/icon';
import { type Room, RoomMeta } from '@/entities/room';
import { RouterButton } from '@/shared/ui/router-button';
import { Logo } from "@/shared/ui/logo";
import styles from './RoomHeader.module.scss';

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

            <Logo className={styles.headerLogo} />

            <div className={styles.headerInfo}>
                <RoomMeta room={room} variant="roomHeader" />

                <RouterButton
                    to={'/booking'}
                    search={{ roomId: room.id }}
                    variant="headerButton"
                >
                    Book now
                </RouterButton>
            </div>
        </header>
    );
};