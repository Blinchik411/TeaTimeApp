import { format, isValid, parseISO } from 'date-fns'

/**
 * Безопасно форматирует дату из строки (ISO или других форматов).
 * Не выбрасывает исключений при невалидных данных, а возвращает fallback или исходную строку.
 */
export const formatSafeDate = (
  dateString?: string | null,
  formatPattern: string = 'dd.MM.yy',
  fallback: string = '',
): string => {
  if (!dateString) {
    return fallback
  }

  try {
    const parsed = parseISO(dateString)
    return isValid(parsed) ? format(parsed, formatPattern) : dateString
  } catch {
    return dateString || fallback
  }
}
