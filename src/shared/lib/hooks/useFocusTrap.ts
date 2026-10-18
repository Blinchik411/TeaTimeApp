import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export interface UseFocusTrapOptions {
  /**
   * If true, moves focus into the container when activated if focus is not already inside.
   * Defaults to true.
   */
  autoFocus?: boolean
  /**
   * If true, restores focus to the element that was focused before the trap became active.
   * Defaults to true.
   */
  restoreFocus?: boolean
}

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  options: UseFocusTrapOptions = {},
) => {
  const { autoFocus = true, restoreFocus = true } = options

  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    const previouslyFocusedElement = document.activeElement as HTMLElement | null

    if (autoFocus && !container.contains(document.activeElement)) {
      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      const first = focusable[0]
      if (first) {
        first.focus()
      } else {
        container.focus()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

      if (focusable.length === 0) {
        e.preventDefault()
        return
      }

      const firstElement = focusable[0]
      const lastElement = focusable[focusable.length - 1]

      if (!firstElement || !lastElement) {
        e.preventDefault()
        return
      }

      if (e.shiftKey) {
        if (
          document.activeElement === firstElement ||
          !container.contains(document.activeElement)
        ) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (
        restoreFocus &&
        previouslyFocusedElement &&
        typeof previouslyFocusedElement.focus === 'function'
      ) {
        previouslyFocusedElement.focus()
      }
    }
  }, [containerRef, isActive, autoFocus, restoreFocus])
}
