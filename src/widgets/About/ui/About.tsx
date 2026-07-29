import { aboutWrapper, aboutWrapper2x } from '@/shared/assets/images';
import styles from './About.module.scss'

export const About = () => {
    return (
        <section className={styles.about}>
            <div className="container">
                <div className={styles.aboutHeader}>
                    <h2 className={styles.aboutTitle}>About Us</h2>
                    <p className={styles.aboutHeaderText}>
                        <strong>Slow Tea House</strong> is more than a café it’s<br />
                        a sanctuary for those who seek calm.<br />
                        Inspired by the philosophy of slow living, we invite<br />
                        you to reconnect with yourself and the world through<br />
                        the art of tea.
                    </p>
                </div>
            </div>

            <div className={styles.aboutImageWrapper}>
                <picture>
                    <source srcSet={`${aboutWrapper} 1x, ${aboutWrapper2x} 2x`} />
                    <img
                        src={aboutWrapper}
                        alt="Slow Tea House ambiance"
                        className={styles.aboutImage}
                        width="1980"
                        height="430"
                    />
                </picture>
            </div>

            <div className="container">
                <div className={styles.aboutFooter}>
                    <p className={styles.aboutFooterText}>
                        We believe in slowing down, savoring simplicity, and finding beauty in small moments. Every detail from the cup to the sound of water is designed to remind you to just be.
                    </p>
                </div>
            </div>
        </section>
    );
};