import { Button } from '@/shared/ui/Button/Button'
import styles from './RoomCard.module.css';

export const RoomCard = () => {
    return (
        <section className={styles.roomCard}>
            <div className={`${styles.cardContent} container`}>
                <div className={styles.cardLeft}>
                    <img
                        src="./images/room-selector-image.jpg"
                        alt="The Ceremony Room"
                        className={styles.cardImage}
                        width="619"
                        height="575"
                        loading="lazy"
                    />
                </div>

                <div className={styles.cardRight}>
                    <h2 className={styles.cardTitle}>The Ceremony Room</h2>
                    <p className={styles.cardText}>
                        In this room, tea is not just a drink it’s a philosophy. Guided by a tea master, you will experience authentic ceremonies inspired by Chinese traditions. Each session reveals the meaning behind every movement the flow of water, the rhythm of breath, the warmth of the cup. The space is minimalist, illuminated by candlelight and natural textures, designed to quiet the mind and awaken the senses.
                    </p>
                    <div className={styles.cardInfo}>
                        <span className={styles.roomPrice}>30$</span>
                        <span className={styles.roomDuration}>75min</span>
                        <span className={styles.roomGuestCount}>
              3
              <img
                  src="./icons/guest-count.svg"
                  alt="3 people holding hands"
                  aria-hidden="true"
                  className={styles.iconGuests}
              />
            </span>
                    </div>
                    <Button href="booking.html" variant="cardButton">
                        Book now
                    </Button>
                </div>
            </div>
        </section>
    );
};