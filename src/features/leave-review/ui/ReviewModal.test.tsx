import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { ReviewModal } from './ReviewModal'
import { createReview } from '../api/leaveReviewApi'


vi.mock('../api/leaveReviewApi', () => ({
  createReview: vi.fn(),
}))

const renderWithClient = (ui: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('ReviewModal', () => {
  it('не должен ничего рендерить, если isOpen={false}', () => {
    renderWithClient(<ReviewModal roomId="room-1" isOpen={false} onClose={vi.fn()} />)


    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('должен отображать модальное окно, когда isOpen={true}', () => {
    renderWithClient(<ReviewModal roomId="room-1" isOpen={true} onClose={vi.fn()} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/add new review/i)).toBeInTheDocument()
  })

  it('должен вызывать onClose при клике на крестик', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()

    renderWithClient(<ReviewModal roomId="room-1" isOpen={true} onClose={handleClose} />)

    const closeBtn = screen.getByRole('button', { name: /close modal/i })
    await user.click(closeBtn)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('должен закрываться при нажатии клавиши Escape на клавиатуре', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()

    renderWithClient(<ReviewModal roomId="room-1" isOpen={true} onClose={handleClose} />)

    await user.keyboard('{Escape}')

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

    it('должен отображать ошибки валидации при попытке отправить пустую форму', async () => {
    const user = userEvent.setup()
    renderWithClient(<ReviewModal roomId="room-1" isOpen={true} onClose={vi.fn()} />)

    // Кликаем по кнопке Submit на пустой форме
    const submitBtn = screen.getByRole('button', { name: /submit review/i })
    await user.click(submitBtn)

    // Ждем появления ошибок валидации от Zod:
    expect(await screen.findByText(/name is too short/i)).toBeInTheDocument()
    expect(await screen.findByText(/review must be at least 10 characters long/i)).toBeInTheDocument()
  })

    it('должен успешно отправлять отзыв и показывать сообщение об успехе', async () => {
    const user = userEvent.setup()
    // Настраиваем, чтобы наш мок успешно возвращал промис
    vi.mocked(createReview).mockResolvedValueOnce({ id: 'test-id' } as any)

    renderWithClient(<ReviewModal roomId="room-1" isOpen={true} onClose={vi.fn()} />)

    // 1. Заполняем поле "Your Name"
    const nameInput = screen.getByPlaceholderText(/enter your name/i)
    await user.type(nameInput, 'Иван')

    // 2. Заполняем поле "Review"
    const reviewInput = screen.getByPlaceholderText(/share your experience/i)
    await user.type(reviewInput, 'Отличная чайная церемония, всё понравилось!')

    // 3. Отправляем форму
    const submitBtn = screen.getByRole('button', { name: /submit review/i })
    await user.click(submitBtn)

    // 4. Проверяем, что API был вызван с нашими данными
    expect(createReview).toHaveBeenCalledWith({
      authorName: 'Иван',
      text: 'Отличная чайная церемония, всё понравилось!',
      rating: 5,
      roomId: 'room-1',
    })

    // 5. Проверяем, что появилось окно благодарности
    expect(await screen.findByText(/thank you!/i)).toBeInTheDocument()
  })


})
