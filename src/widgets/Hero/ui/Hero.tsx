import { Button } from '@/shared/ui/Button/Button'
import styles from './Hero.module.css';

export const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`${styles.heroContent} container`}>
                <h1 className={styles.heroTitle}>Where time flows slower</h1>
                <p className={styles.heroText}>
                    Discover the harmony of tea, nature,<br />
                    and silence in our immersive themed rooms
                </p>
                <Button href="book-now.html" variant="heroButton">
                    Explore the Rooms
                </Button>
            </div>
        </section>
    );
};