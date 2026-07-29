import styles from './Button.module.css';

export const Button = ({
                           children,
                           href,
                           variant = 'heroButton',
                           onClick,
                           type = 'button'
                       }) => {
    const className = `${styles.button} ${styles[variant] || ''}`;

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};