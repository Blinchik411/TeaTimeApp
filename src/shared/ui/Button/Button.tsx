import { Link } from '@tanstack/react-router';
import styles from './Button.module.scss';

export const Button = ({
                           children,
                           to,
                           variant = 'heroButton',
                           onClick,
                           type = 'button'
                       }) => {
    const className = `${styles.button} ${styles[variant] || ''}`;

    // Если передан проп 'to', рендерим ссылку для внутреннего роутинга
    if (to) {
        return (
            <Link to={to} className={className}>
                {children}
            </Link>
        );
    }

    // Если 'to' нет, рендерим обычную кнопку (например, для форм или событий)
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};