import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
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
          <li>
            <a href="#" className={styles.headerMenuLink}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className={styles.headerMenuLink}>
              About Us
            </a>
          </li>
          <li>
            <a href="#rooms" className={styles.headerMenuLink}>
              Rooms
            </a>
          </li>
          <li>
            <a href="#contact" className={styles.headerMenuLink}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
