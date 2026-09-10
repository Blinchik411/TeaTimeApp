import { Icon } from '@/shared/ui/Icon';
import type { RoomPreview } from '@/entities/room';
import styles from './RoomDetailsInfo.module.scss';

interface RoomDetailsInfoProps {
    room: RoomPreview;
    showPrice?: boolean;
    className?: string;
}

export const RoomDetailsInfo = ({
                                    room,
                                    showPrice = true,
                                    className = ''
                                }: RoomDetailsInfoProps) => {
    return (
        <div className={`${styles.infoWrapper} ${className}`}>
            <h2 className={styles.cardTitle}>{room.title}</h2>
            <p className={styles.cardText}>{room.description}</p>

            <div className={styles.cardInfo}>
                {showPrice && <span className={styles.roomPrice}>{room.price}$</span>}
                <span className={styles.roomDuration}>{room.duration} min</span>
                <span className={styles.roomGuestCount}>
                    {room.maxGuests}
                    <Icon name="GuestCount" className={styles.iconGuests} />
                </span>
            </div>
        </div>
    );
};