import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

interface ButtonProps extends ComponentProps<'button'> {
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

export const Button = ({
  children,
  variant = 'heroButton',
  type = 'button',
  className: externalClassName,
  ref,
  ...props
}: ButtonProps) => {
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
}
