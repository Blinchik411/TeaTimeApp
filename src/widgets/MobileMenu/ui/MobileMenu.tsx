import showTeaHouseLogo from '@/shared/assets/icons/SlowTeaHouse.svg'
import styles from './MobileMenu.module.scss'
import {SocialLinks} from "@/shared/ui/SocialLinks/SocialLinks";


export const MobileMenu = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.isOpen : ''}`}>
            <div className={`${styles.headerMobileMenu} ${styles.mobileMenuLight}`}>
                <button
                    className={styles.closeMobileMenuButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть меню"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="18.3333" width="25.9272" height="2.35702" rx="1.17851" transform="rotate(-45 0 18.3333)" fill="black" />
                        <rect x="1.66699" width="25.9272" height="2.35702" rx="1.17851" transform="rotate(45 1.66699 0)" fill="black" />
                    </svg>
                </button>
                <div className={styles.mobileLogo}>
                    <a href="/" className={styles.logo}>
                        <img
                            src={showTeaHouseLogo}
                            alt="Slow Tea House Logo"
                            className={styles.mobileLogoImage}
                            width="194"
                            height="17"
                        />
                    </a>
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