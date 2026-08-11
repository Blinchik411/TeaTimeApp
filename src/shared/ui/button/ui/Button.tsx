import React, { ReactNode, forwardRef } from 'react';
import styles from './Button.module.scss';


interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children: ReactNode;
    variant?: 'heroButton' | 'cardButton' | 'headerButton';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                                      children,
                                                                      variant = 'heroButton',
                                                                      type = 'button',
                                                                      className: externalClassName, // Извлекаем className из входящих пропсов
                                                                      ...props // Остальные пропсы (onClick и т.д.)
                                                                  }, ref) => {

    // Объединяем внутренние стили с внешним className (например, от router-button)
    const combinedClassName = [
        styles.button,
        styles[variant],
        externalClassName
    ].filter(Boolean).join(' '); // filter(Boolean) уберет undefined и пустые строки

    return (
        <button
            ref={ref}
            type={type}
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';