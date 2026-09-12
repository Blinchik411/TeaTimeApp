import { SocialLinks } from '@/shared/ui/social-links';
import {Logo} from "@/shared/ui/logo";
import styles from './Footer.module.scss';

interface FooterProps {
    theme?: 'dark' | 'light';
}

export const Footer = ({ theme = 'dark' }: FooterProps) => {
    const footerClass = `${styles.footer} ${theme === 'light' ? styles.footerLight : ''}`;

    const FOOTER_CONTACTS = {
        schedule: 'Open daily: 10:00–21:00',
        address: {
            label: '12 Green Street, Lviv',
            mapUrl: 'https://maps.app.goo.gl/yd8SoGkCGjK5QSvn7',
        },
        email: 'SlowTeaHouse@gmail.com',
        phones: [
            { href: 'tel:+380671234567', label: '+380 67 123 4567' },
            { href: 'tel:+380671234567', label: '+380 67 123 4567' },
        ],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.257049656723!2d24.02457497239628!3d49.84014078184026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add6c26c0945f%3A0xa71e3148dcaac6d8!2zV2hpdGUgUmFiYml0IFNob3cgQmFyIC8g0JHRltC70LjQuSDQmtGA0L7Qu9C40Log0KjQvtGDINCR0LDRgA!5e0!3m2!1sru!2sru!4v1780760501677!5m2!1sru!2sru',
    }

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
                        <p className={styles.contactsTime}>{FOOTER_CONTACTS.schedule}</p>
                        <a
                            className={`${styles.contactLink} ${styles.contactLinkUnderline} ${styles.contactLinkMap}`}
                            href={FOOTER_CONTACTS.address.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {FOOTER_CONTACTS.address.label}
                        </a>
                        <a
                            className={`${styles.contactLink} ${styles.contactLinkGmail}`}
                            href={`mailto:${FOOTER_CONTACTS.email}`}
                        >
                            {FOOTER_CONTACTS.email}
                        </a>
                        <div className={`${styles.footerPhonesGroup} ${styles.contactLinkTelephone}`}>
                            {FOOTER_CONTACTS.phones.map((phone, idx) => (
                                <a key={idx} className={styles.contactLink} href={phone.href}>
                                    {phone.label}
                                </a>
                            ))}
                        </div>
                    </address>

                    <SocialLinks className={styles.footerSocials} />

                </div>
                <div className={styles.footerRight}>
                    <iframe
                        className={styles.footerMap}
                        src={FOOTER_CONTACTS.mapEmbedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Slow Tea House Location"
                    />
                </div>
            </div>
        </footer>
    );
};