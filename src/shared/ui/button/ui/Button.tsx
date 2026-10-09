import React, { type ReactNode, forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?:
    | 'heroButton'
    | 'cardButton'
    | 'headerButton'
    | 'bookingButton'
    | 'experienceButton'
    | 'openMobileMenuButton'
    | 'closeMobileMenuButton'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'heroButton', type = 'button', className: externalClassName, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(styles.button, styles[variant], externalClassName)}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
