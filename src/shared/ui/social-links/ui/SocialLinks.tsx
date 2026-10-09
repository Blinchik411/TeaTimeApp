import { Icon } from '../../icon'
import { Link } from '@tanstack/react-router'
import styles from './SocialLinks.module.scss'

interface SocialLinksProps {
  className?: string
}

export const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={`${styles.socials} ${className || ''}`}>
      <Link to="/" className={styles.socialLink} target="_blank" rel="noreferrer">
        <Icon name="Instagram" />
      </Link>
      <Link to="/" className={styles.socialLink} target="_blank" rel="noreferrer">
        <Icon name="TikTok" />
      </Link>
      <Link to="/" className={styles.socialLink} target="_blank" rel="noreferrer">
        <Icon name="Facebook" />
      </Link>
      <Link to="/" className={styles.socialLink} target="_blank" rel="noreferrer">
        <Icon name="Telegram" />
      </Link>
    </div>
  )
}
