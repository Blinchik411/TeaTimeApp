import {SocialLinks} from "@/shared/ui/social-links/ui/SocialLinks";
import styles from './MobileMenu.module.scss'
import {Icon} from "@/shared/ui/Icon";
import {Link} from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";


interface MobileMenuProps {
    isOpen: boolean,
    onClose:() => void,
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.isOpen : ''}`}>
            <div className={`${styles.headerMobileMenu} ${styles.mobileMenuLight}`}>
                <Button
                    variant='closeMobileMenuButton'
                    className={styles.closeMobileMenuButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть меню"
                >
                    <Icon name="CloseButton" width={20} height={20} />
                </Button>
                <div className={styles.mobileLogo}>
                    <Link to="/" className={styles.logo}>
                        <Icon  className={styles.mobileLogoImage} height={17} name="SlowTeaHouse" width={194}/>
                    </Link>
                </div>
            </div>

            <nav className={styles.headerMenu}>
                <ul className={styles.mobileMenuList}>
                    <li><a href="/" className={styles.headerMenuLink}>Home</a></li>
                    <li><a href="/" className={styles.headerMenuLink}>About Us</a></li>
                    <li><a href="/" className={styles.headerMenuLink}>Rooms</a></li>
                    <li><a href="/" className={styles.headerMenuLink}>Contact</a></li>
                </ul>
            </nav>

            <SocialLinks className={styles.mobileSocials} />
        </div>
    );
};