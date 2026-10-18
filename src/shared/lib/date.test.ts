import { describe, expect, it } from 'vitest'

import { formatSafeDate } from './date'

describe('formatSafeDate', () => {
  it('корректно форматирует валидную ISO-дату с форматом по умолчанию (dd.MM.yy)', () => {
    const result = formatSafeDate('2026-10-18T10:00:00Z')
    expect(result).toBe('18.10.26')
  })

  it('применяет кастомный паттерн форматирования', () => {
    const result = formatSafeDate('2026-10-18', 'MMMM dd, yyyy')
    expect(result).toBe('October 18, 2026')
  })

  it('возвращает fallback при пустой строке, undefined или null', () => {
    expect(formatSafeDate(undefined, 'dd.MM.yy', 'Selected Date')).toBe('Selected Date')
    expect(formatSafeDate(null, 'dd.MM.yy', 'Default')).toBe('Default')
    expect(formatSafeDate('', 'dd.MM.yy', 'Fallback')).toBe('Fallback')
  })

  it('возвращает исходную строку при передаче невалидной даты без выброса исключений', () => {
    const invalidDateStr = 'not-a-valid-date-string'
    const result = formatSafeDate(invalidDateStr)
    expect(result).toBe(invalidDateStr)
  })
})
