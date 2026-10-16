import { render, screen } from '@testing-library/react'

import { List } from './List'

describe('List (Generic Component)', () => {
  interface User {
    id: number
    name: string
  }

  const mockUsers: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]

  it('должен корректно рендерить список элементов с переданным renderItem', () => {
    render(
      <List
        items={mockUsers}
        keyExtractor={(user) => user.id}
        renderItem={(user) => <span data-testid="user-item">{user.name}</span>}
      />,
    )

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getAllByTestId('user-item')).toHaveLength(2)
  })

  it('должен рендерить emptyFallback, если передан пустой массив', () => {
    render(
      <List
        items={[]}
        keyExtractor={(user: User) => user.id}
        emptyFallback={<p>Список пуст</p>}
        renderItem={(user) => <span>{user.name}</span>}
      />,
    )

    expect(screen.getByText('Список пуст')).toBeInTheDocument()
    expect(screen.queryByTestId('user-item')).not.toBeInTheDocument()
  })

  it('должен поддерживать кастомный тег-обертку через prop "as"', () => {
    render(
      <List
        as="ul"
        items={mockUsers}
        keyExtractor={(user) => user.id}
        renderItem={(user) => <li>{user.name}</li>}
      />,
    )

    // Тег <ul> имеет доступную роль 'list':
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()

    // Теги <li> имеют доступную роль 'listitem':
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })
})
