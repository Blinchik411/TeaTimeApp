import type { ComponentProps, ReactNode } from 'react'

import clsx from 'clsx'

import styles from './Button.module.scss'

export interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
  variant?:
    | 'heroButton'
    | 'cardButton'
    | 'headerButton'
    | 'bookingButton'
    | 'experienceButton'
    | 'reviewButton'
    | 'retryButton'
    | 'openMobileMenuButton'
    | 'closeMobileMenuButton'
  isLoading?: boolean
  loadingText?: string
}

export const Button = ({
  children,
  variant = 'heroButton',
  type = 'button',
  className: externalClassName,
  isLoading = false,
  loadingText,
  disabled,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={clsx(styles.button, styles[variant], externalClassName)}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  )
}
