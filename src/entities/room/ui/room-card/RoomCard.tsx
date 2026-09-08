import { RouterButton } from "@/shared/ui/router-button";
import { Icon } from '@/shared/ui/Icon';
import { type RoomPreview} from '@/entities/room/model/types';
import styles from './RoomCard.module.scss';

interface RoomCardProps {
    room: RoomPreview;
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
                        <span className={styles.roomDuration}>{room.duration}min</span>
                        <span className={styles.roomGuestCount}>
              {room.maxGuests}
                            <Icon name="GuestCount" className={styles.iconGuests} />
            </span>
                    </div>

                    <RouterButton
                        to="/room/$roomId"
                        params={{ roomId: room.id }}
                        variant="cardButton"
                    >
                        Book now
                    </RouterButton>
                </div>
            </div>
        </section>
    );
};