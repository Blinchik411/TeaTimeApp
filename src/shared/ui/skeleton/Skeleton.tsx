import clsx from 'clsx'
import type { CSSProperties } from 'react'
import styles from './Skeleton.module.scss'

export interface SkeletonProps {
  className?: string
  variant?: 'light' | 'dark'
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

export const Skeleton = ({
  className,
  variant = 'light',
  width,
  height,
  borderRadius,
}: SkeletonProps) => {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
  }

  return (
    <div
      className={clsx(styles.skeleton, styles[variant], className)}
      style={style}
      aria-hidden="true"
    />
  )
}
