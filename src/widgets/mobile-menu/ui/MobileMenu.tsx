import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { SocialLinks } from '@/shared/ui/social-links'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import styles from './MobileMenu.module.scss'

import { NAV_ITEMS } from '@/shared/config/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = (hash?: string) => {
    onClose()

    if (hash) {
      setTimeout(() => {
        const targetElement = document.getElementById(hash)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div
        className={clsx(styles.backdrop, isOpen && styles.isOpen)}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={clsx(styles.mobileMenu, isOpen && styles.isOpen)}
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        <div className={clsx(styles.headerMobileMenu, styles.mobileMenuLight)}>
          <Button
            variant="closeMobileMenuButton"
            className={styles.closeMobileMenuButton}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="CloseButton" width={20} height={20} />
          </Button>

          <Logo
            className={styles.mobileLogo}
            iconClassName={styles.mobileLogoImage}
            width={194}
            height={17}
            onClick={onClose}
          />
        </div>

        <nav className={styles.headerMenu} aria-label="Main navigation">
          <ul className={styles.mobileMenuList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  className={styles.headerMenuLink}
                  onClick={() => handleLinkClick(item.hash)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className={styles.mobileSocials} />
      </aside>
    </>
  )
}
