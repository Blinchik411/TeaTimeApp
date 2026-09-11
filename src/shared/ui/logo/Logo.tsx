import { Link } from '@tanstack/react-router';
import { Icon } from '@/shared/ui/Icon';

interface LogoProps {
    to?: string;
    className?: string;       // Класс для ссылки (напр. styles.footerLogo, styles.mobileLogo)
    iconClassName?: string;   // Класс для SVG-иконки (напр. styles.mobileLogoImage)
    width?: number;
    height?: number;
    onClick?: () => void;
}

export const Logo = ({
                         to = '/',
                         className = '',
                         iconClassName = '',
                         width = 250,
                         height = 39,
                         onClick,
                     }: LogoProps) => {
    return (
        <Link to={to} className={className} onClick={onClick}>
            <Icon
                name="SlowTeaHouse"
                className={iconClassName}
                width={width}
                height={height}
            />
        </Link>
    );
};