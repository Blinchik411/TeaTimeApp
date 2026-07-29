import { Icon } from '@/shared/ui/Icon';
import styles from './SocialLinks.module.scss';

interface SocialLinksProps {
    className?: string;
}

export const SocialLinks = ({ className }: SocialLinksProps) => {
    return (

        <div className={`${styles.socials} ${className || ''}`}>
            <a href="/" className={styles.socialLink} target="_blank" rel="noreferrer">
                <Icon name="Instagram" />
            </a>
            <a href="/" className={styles.socialLink} target="_blank" rel="noreferrer">
                <Icon name="TikTok" />
            </a>
            <a href="/" className={styles.socialLink} target="_blank" rel="noreferrer">
                <Icon name="Facebook" />
            </a>
            <a href="/" className={styles.socialLink} target="_blank" rel="noreferrer">
                <Icon name="Telegram" />
            </a>
        </div>
    );
};