import { useRef, useState } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useFocusTrap } from './useFocusTrap'

const TestTrapComponent = ({
  initialOpen = true,
  autoFocus = true,
  restoreFocus = true,
}: {
  initialOpen?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const containerRef = useRef<HTMLDivElement>(null)

  useFocusTrap(containerRef, isOpen, { autoFocus, restoreFocus })

  return (
    <div>
      <button type="button" data-testid="outside-btn" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <div ref={containerRef} data-testid="modal-container">
          <button type="button" data-testid="first-btn">
            First
          </button>
          <input data-testid="middle-input" placeholder="Middle" />
          <button type="button" data-testid="last-btn" onClick={() => setIsOpen(false)}>
            Last / Close
          </button>
        </div>
      )}
    </div>
  )
}

describe('useFocusTrap', () => {
  it('автоматически переводит фокус на первый интерактивный элемент при активации', () => {
    render(<TestTrapComponent initialOpen={true} />)

    const firstBtn = screen.getByTestId('first-btn')
    expect(document.activeElement).toBe(firstBtn)
  })

  it('зацикливает фокус на первый элемент при нажатии Tab на последнем элементе', async () => {
    const user = userEvent.setup()
    render(<TestTrapComponent initialOpen={true} />)

    const firstBtn = screen.getByTestId('first-btn')
    const lastBtn = screen.getByTestId('last-btn')

    lastBtn.focus()
    expect(document.activeElement).toBe(lastBtn)

    await user.tab()
    expect(document.activeElement).toBe(firstBtn)
  })

  it('зацикливает фокус на последний элемент при нажатии Shift+Tab на первом элементе', async () => {
    const user = userEvent.setup()
    render(<TestTrapComponent initialOpen={true} />)

    const firstBtn = screen.getByTestId('first-btn')
    const lastBtn = screen.getByTestId('last-btn')

    firstBtn.focus()
    expect(document.activeElement).toBe(firstBtn)

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(lastBtn)
  })

  it('восстанавливает фокус на предыдущий активный элемент после деактивации', async () => {
    const user = userEvent.setup()
    render(<TestTrapComponent initialOpen={false} />)

    const outsideBtn = screen.getByTestId('outside-btn')
    outsideBtn.focus()
    expect(document.activeElement).toBe(outsideBtn)

    // Кликаем и открываем ловушку
    await user.click(outsideBtn)

    const lastBtn = screen.getByTestId('last-btn')
    expect(screen.getByTestId('modal-container')).toBeInTheDocument()

    // Закрываем ловушку
    await user.click(lastBtn)

    expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(outsideBtn)
  })
})
