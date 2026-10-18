import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ContactStep } from './ContactStep'

describe('ContactStep', () => {
  it('корректно отображает переданные initialValues', () => {
    const initialValues = {
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '+79991234567',
      email: 'ivan@example.com',
    }

    render(<ContactStep initialValues={initialValues} onSuccess={vi.fn()} />)

    expect(screen.getByPlaceholderText('Name')).toHaveValue('Иван')
    expect(screen.getByPlaceholderText('Surname')).toHaveValue('Иванов')
    expect(screen.getByPlaceholderText('Phone')).toHaveValue('+79991234567')
    expect(screen.getByPlaceholderText('Email')).toHaveValue('ivan@example.com')
  })

  it('обновляет значение полей при пользовательском вводе (контролируемый компонент)', async () => {
    const user = userEvent.setup()
    render(<ContactStep onSuccess={vi.fn()} />)

    const nameInput = screen.getByPlaceholderText('Name')
    await user.type(nameInput, 'Анна')

    expect(nameInput).toHaveValue('Анна')
  })

  it('вызывает onSuccess с валидными данными при отправке формы', async () => {
    const user = userEvent.setup()
    const handleSuccess = vi.fn()

    render(
      <div>
        <ContactStep onSuccess={handleSuccess} />
        <button type="submit" form="contact-form">
          Submit
        </button>
      </div>,
    )

    await user.type(screen.getByPlaceholderText('Name'), 'Алексей')
    await user.type(screen.getByPlaceholderText('Surname'), 'Смирнов')
    await user.type(screen.getByPlaceholderText('Phone'), '+79990001122')
    await user.type(screen.getByPlaceholderText('Email'), 'alex@example.com')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSuccess).toHaveBeenCalledTimes(1)
    expect(handleSuccess).toHaveBeenCalledWith({
      firstName: 'Алексей',
      lastName: 'Смирнов',
      phone: '+79990001122',
      email: 'alex@example.com',
    })
  })

  it('показывает ошибки валидации при невалидных данных', async () => {
    const user = userEvent.setup()
    const handleSuccess = vi.fn()

    render(
      <div>
        <ContactStep onSuccess={handleSuccess} />
        <button type="submit" form="contact-form">
          Submit
        </button>
      </div>,
    )

    await user.type(screen.getByPlaceholderText('Name'), 'A')
    await user.type(screen.getByPlaceholderText('Email'), 'invalid-email')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSuccess).not.toHaveBeenCalled()
    expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    expect(screen.getByText('Surname must be at least 2 characters')).toBeInTheDocument()
    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
  })
})
