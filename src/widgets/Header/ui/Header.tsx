import  { useState } from 'react';
import { MobileMenu } from '../../MobileMenu';
import styles from './Header.module.scss'
import icon from '../../../shared/assets/icons/SlowTeaHouse.svg'
import burgerIcon from '../../../shared/assets/icons/burger-menu.svg'

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={`${styles.header} container`}>
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <button
                className={styles.menuButton}
                aria-label="Открыть меню"
                onClick={() => setIsMobileMenuOpen(true)}
            >
                <img src={burgerIcon} alt="Menu" />
            </button>

            <a href="/" className={styles.logo}>
                <img
                    src={icon}
                    alt="Slow Tea House Logo"
                    className={styles.headerLogoImage}
                    width="250"
                    height="39"
                />
            </a>

            <nav className={styles.headerMenu}>
                <ul className={styles.headerMenuList}>
                    <li><a href="/" className={styles.headerMenuLink}>Home</a></li>
                    <li><a href="/" className={styles.headerMenuLink}>About Us</a></li>
                    <li><a href="/" className={styles.headerMenuLink}>Rooms</a></li>
                    <li><a href="/" className={styles.headerMenuLink}>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};