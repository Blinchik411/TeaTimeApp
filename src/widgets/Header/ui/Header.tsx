import { useState } from 'react';
import {MobileMenu} from "@/features/mobileMenu";
import { Icon } from '@/shared/ui/Icon';
import {Link} from "@tanstack/react-router";
import {Button} from "@/shared/ui/button";
import styles from './Header.module.scss';
import {Logo} from "@/shared/ui/logo";

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={`${styles.header} container`}>
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <Button
                variant="openMobileMenuButton"
                className={styles.menuButton}
                aria-label="Открыть меню"
                onClick={() => setIsMobileMenuOpen(true)}
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
                    <li><a href="#" className={styles.headerMenuLink}>Home</a></li>
                    <li><a href="#about" className={styles.headerMenuLink}>About Us</a></li>
                    <li><a href="#rooms" className={styles.headerMenuLink}>Rooms</a></li>
                    <li><a href="#contact" className={styles.headerMenuLink}>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};