import { render, screen } from '@testing-library/react'
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event'

import { Button } from './Button'

describe('Button', () => {
  it('должен корректно рендерить переданный текст', () => {
    render(<Button>Нажми меня</Button>)
    const button = screen.getByRole('button', { name: /нажми меня/i })
    expect(button).toBeInTheDocument()
  })

  it('должен вызывать onClick при клике пользователя', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Кликни</Button>)

    const button = screen.getByRole('button', { name: /кликни/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('не должен вызывать onClick, если кнопка disabled', async () => {
    const user = userEvent.setup({ pointerEventsCheck: PointerEventsCheckLevel.Never })
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Заблокировано
      </Button>,
    )

    const button = screen.getByRole('button', { name: /заблокировано/i })

    expect(button).toBeDisabled()

    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('должен показывать loadingText и быть заблокированным, когда isLoading={true}', () => {
    render(
      <Button isLoading={true} loadingText="Загрузка...">
        Отправить
      </Button>,
    )

    const button = screen.getByRole('button', { name: /загрузка/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Загрузка...')

    expect(screen.queryByText(/отправить/i)).not.toBeInTheDocument()
  })
})
