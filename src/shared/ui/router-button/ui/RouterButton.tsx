import type { ComponentProps, ReactNode } from 'react'
import { createLink } from '@tanstack/react-router'
import clsx from 'clsx'
import buttonStyles from '@/shared/ui/button/ui/Button.module.scss'

export type ButtonVariant =
  | 'heroButton'
  | 'cardButton'
  | 'headerButton'
  | 'bookingButton'
  | 'experienceButton'
  | 'openMobileMenuButton'
  | 'closeMobileMenuButton'

interface LinkButtonAnchorProps extends ComponentProps<'a'> {
  children: ReactNode
  variant?: ButtonVariant
}

const LinkButtonAnchor = ({
  children,
  variant = 'heroButton',
  className,
  ref,
  ...props
}: LinkButtonAnchorProps) => {
  return (
    <a
      ref={ref}
      className={clsx(buttonStyles.button, buttonStyles[variant], className)}
      {...props}
    >
      {children}
    </a>
  )
}

export const RouterButton = createLink(LinkButtonAnchor)


