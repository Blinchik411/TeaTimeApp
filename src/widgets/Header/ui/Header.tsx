import { Link } from '@tanstack/react-router'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { NAV_ITEMS } from '@/shared/config/navigation'
import styles from './Header.module.scss'

interface HeaderProps {
  onOpenMenu?: () => void
}

export const Header = ({ onOpenMenu }: HeaderProps) => {
  return (
    <header className={`${styles.header} container`}>
      <Button
        variant="openMobileMenuButton"
        className={styles.menuButton}
        aria-label="Open menu"
        onClick={onOpenMenu}
      >
        <Icon name="BurgerMenu" width={24} height={24} />
      </Button>

      <Logo
        className={styles.logo}
        iconClassName={styles.headerLogoImage}
        width={250}
        height={39}
      />

      <nav className={styles.headerMenu}>
        <ul className={styles.headerMenuList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link to={item.to} hash={item.hash} className={styles.headerMenuLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
