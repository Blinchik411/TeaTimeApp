import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('в статическом режиме (interactive=false) отображает рейтинг и не содержит кнопок', () => {
    render(<StarRating rating={4} />)

    expect(screen.getByLabelText(/rating: 4 out of 5/i)).toBeInTheDocument()

    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('в интерактивном режиме рендерит 5 кнопок и вызывает onChange с правильным числом звезд', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<StarRating rating={2} interactive onChange={handleChange} />)

    const starButtons = screen.getAllByRole('button')
    expect(starButtons).toHaveLength(5)

    const fourthStar = screen.getByRole('button', { name: /rate 4 of 5 stars/i })
    await user.click(fourthStar)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(4)
  })

 it('не должен вызывать onChange при клике, если disabled={true}', async () => {
  const user = userEvent.setup()
  const handleChange = vi.fn()

  render(<StarRating interactive rating={2} disabled onChange={handleChange} />)

  const firstStar = screen.getByRole('button', { name: /rate 1 of 5 stars/i })
  
  expect(firstStar).toBeDisabled()

  await user.click(firstStar)

  expect(handleChange).not.toHaveBeenCalled()
})

})
