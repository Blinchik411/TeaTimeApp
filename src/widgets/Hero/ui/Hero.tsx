import {Button} from "@/shared/ui/button";
import styles from './Hero.module.scss';

export const Hero = () => {
    return (
        <section  id="#" className={styles.hero}>
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