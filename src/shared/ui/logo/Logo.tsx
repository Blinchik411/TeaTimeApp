import { Link, type LinkProps } from '@tanstack/react-router'
import { Icon } from '../icon'

interface LogoProps {
  to?: LinkProps['to']
  className?: string
  iconClassName?: string
  width?: number
  height?: number
  onClick?: () => void
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
      <Icon name="SlowTeaHouse" className={iconClassName} width={width} height={height} />
    </Link>
  )
}
