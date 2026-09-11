import { SocialLinks } from '@/shared/ui/social-links';
import styles from './Footer.module.scss';
import {Logo} from "@/shared/ui/logo";

interface FooterProps {
    theme?: 'dark' | 'light';
}

export const Footer = ({ theme = 'dark' }: FooterProps) => {
    const footerClass = `${styles.footer} ${theme === 'light' ? styles.footerLight : ''}`;

    return (
        <footer  id={'contact'} className={footerClass}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerLeft}>
                    <Logo
                        className={styles.footerLogo}
                        width={250}
                        height={39}
                    />
                    <address className={styles.footerContacts}>
                        <p className={styles.contactsTime}>Open daily: 10:00–21:00</p>
                        <a className={`${styles.contactLink} ${styles.contactLinkUnderline} ${styles.contactLinkMap}`} href="https://maps.app.goo.gl/yd8SoGkCGjK5QSvn7" target="_blank" rel="noreferrer">12 Green Street, Lviv</a>
                        <a className={`${styles.contactLink} ${styles.contactLinkGmail}`} href="mailto:SlowTeaHouse@gmail.com">SlowTeaHouse@gmail.com</a>
                        <div className={`${styles.footerPhonesGroup} ${styles.contactLinkTelephone}`}>
                            <a className={styles.contactLink} href="tel:+380671234567">+380 67 123 4567</a>
                            <a className={styles.contactLink} href="tel:+380671234567">+380 67 123 4567</a>
                        </div>
                    </address>

                    <SocialLinks className={styles.footerSocials} />
                </div>

                <div className={styles.footerRight}>
                    <iframe
                        className={styles.footerMap}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.257049656723!2d24.02457497239628!3d49.84014078184026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add6c26c0945f%3A0xa71e3148dcaac6d8!2zV2hpdGUgUmFiYml0IFNob3cgQmFyIC8g0JHRltC70LjQuSDQmtGA0L7Qu9C40Log0KjQvtGDINCR0LDRgA!5e0!3m2!1sru!2sru!4v1780760501677!5m2!1sru!2sru"
                        width="675"
                        height="575"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Slow Tea House Location"
                    />
                </div>
            </div>
        </footer>
    );
};