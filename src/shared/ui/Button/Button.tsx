import styles from './Button.module.scss';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    variant?: 'heroButton' | 'cardButton' | 'headerButton';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
}

export const Button = ({
                           children,
                           variant = 'heroButton',
                           onClick,
                           type = 'button',
                           href
                       }: ButtonProps) => {
    const className = `${styles.button} ${styles[variant] || ''}`;

    // Если есть href, используем <a> вместо <button>
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