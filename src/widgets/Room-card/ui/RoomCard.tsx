import { Button } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon';
import { type Room } from '@/entities/room/model/types';
import styles from './RoomCard.module.scss';

interface RoomCardProps {
    room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
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
                    <h2 className={styles.cardTitle}>{room.title}</h2>
                    <p className={styles.cardText}>{room.description}</p>

                    <div className={styles.cardInfo}>
                        <span className={styles.roomPrice}>{room.price}$</span>
                        <span className={styles.roomDuration}>{room.duration}</span>
                        <span className={styles.roomGuestCount}>
              {room.maxGuests}
                            <Icon name="GuestCount" className={styles.iconGuests} />
            </span>
                    </div>

                    <Button href={`/booking/${room.id}`} variant="cardButton">
                        Book now
                    </Button>
                </div>
            </div>
        </section>
    );
};