/**
 * Утилиты форматирования полей платежной формы
 */

/**
 * Форматирует срок действия карты (MM/YY).
 * Автоматически подставляет слеш после ввода MM (2 цифр)
 * и корректно обрабатывает удаление через Backspace.
 */
export const formatExpiryDate = (value: string, prevValue: string): string => {
  const isDeleting = value.length < prevValue.length
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (isDeleting) {
    if (prevValue.endsWith('/') && value === prevValue.slice(0, -1)) {
      return digits.slice(0, 1)
    }
    if (digits.length <= 2) {
      return digits
    }
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  if (digits.length > 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }
  if (digits.length === 2) {
    return `${digits}/`
  }
  return digits
}

/**
 * Ограничивает номер карты только цифрами и максимум 16 символами.
 */
export const formatCardNumber = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 16)
}

/**
 * Ограничивает CVC-код только цифрами и максимум 4 символами.
 */
export const formatCvc = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 4)
}
