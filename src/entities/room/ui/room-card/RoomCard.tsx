import { RouterButton } from "@/shared/ui/router-button";
import { type RoomPreview} from '@/entities/room/model/types';
import styles from './RoomCard.module.scss';
import {RoomDetailsInfo} from "@/entities/room";

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

                    <RoomDetailsInfo room={room}/>
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