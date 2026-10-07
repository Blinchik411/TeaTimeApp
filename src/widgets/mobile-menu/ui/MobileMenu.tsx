import { Link } from "@tanstack/react-router";
import { SocialLinks } from "@/shared/ui/social-links";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.isOpen : ''}`.trim()}>
            <div className={`${styles.headerMobileMenu} ${styles.mobileMenuLight}`}>
                <Button
                    variant="closeMobileMenuButton"
                    className={styles.closeMobileMenuButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть меню"
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

            <nav className={styles.headerMenu}>
                <ul className={styles.mobileMenuList}>
                    <li>
                        <Link to="/" className={styles.headerMenuLink} onClick={onClose}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={styles.headerMenuLink} onClick={onClose}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={styles.headerMenuLink} onClick={onClose}>
                            Rooms
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={styles.headerMenuLink} onClick={onClose}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>

            <SocialLinks className={styles.mobileSocials} />
        </div>
    );
};