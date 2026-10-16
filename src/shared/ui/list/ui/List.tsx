import { Fragment, type ElementType, type ReactNode } from 'react'

export interface ListProps<T> {
  items: T[]
  keyExtractor: (item: T, index: number) => string | number
  renderItem: (item: T, index: number) => ReactNode
  emptyFallback?: ReactNode
  className?: string
  as?: ElementType
}

export const List = <T,>({
  items,
  keyExtractor,
  renderItem,
  emptyFallback = null,
  className,
  as: Component = 'div',
}: ListProps<T>) => {
  if (items.length === 0) {
    return <>{emptyFallback}</>
  }

  return (
    <Component className={className}>
      {items.map((item, index) => (
        <Fragment key={keyExtractor(item, index)}>{renderItem(item, index)}</Fragment>
      ))}
    </Component>
  )
}
