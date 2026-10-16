import { formatCardNumber } from './paymentFormatters'

describe('formatCardNumber', () => {
  it.each([
    {
      description: 'должен оставлять только цифры, удаляя пробелы',
      input: '123 456',
      expected: '123456',
    },
    {
      description: 'должен обрезать номер карты до 16 символов',
      input: '12345678901234567890',
      expected: '1234567890123456',
    },
    {
      description: 'должен возвращать пустую строку при пустом вводе',
      input: '',
      expected: '',
    },
  ])('$description', ({ input, expected }) => {
    expect(formatCardNumber(input)).toBe(expected)
  })
})
