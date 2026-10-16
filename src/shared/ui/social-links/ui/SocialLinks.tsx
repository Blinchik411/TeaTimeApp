import { Icon } from '../../icon'

import styles from './SocialLinks.module.scss'

interface SocialLinksProps {
  className?: string
}

export const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={`${styles.socials} ${className || ''}`}>
      <a
        href="https://instagram.com"
        className={styles.socialLink}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Instagram"
      >
        <Icon name="Instagram" />
      </a>
      <a
        href="https://tiktok.com"
        className={styles.socialLink}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="TikTok"
      >
        <Icon name="TikTok" />
      </a>
      <a
        href="https://facebook.com"
        className={styles.socialLink}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Facebook"
      >
        <Icon name="Facebook" />
      </a>
      <a
        href="https://t.me"
        className={styles.socialLink}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Telegram"
      >
        <Icon name="Telegram" />
      </a>
    </div>
  )
}
