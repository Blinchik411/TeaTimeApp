import { renderHook, act } from '@testing-library/react'
import { z } from 'zod'
import { useZodForm } from './useZodForm'

describe('useZodForm', () => {
  const testSchema = z.object({
    name: z.string().min(3, 'Имя слишком короткое'),
  })

  it('должен инициализироваться с пустым объектом ошибок', () => {
    const { result } = renderHook(() => useZodForm(testSchema))

    expect(result.current.errors).toEqual({})
  })

  it('должен записывать ошибки и не вызывать onSuccess при невалидных данных', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useZodForm(testSchema, onSuccess))

    const formData = new FormData()
    formData.append('name', 'Ya') 


    await act(async () => {
      await result.current.handleAction(formData)
    })

    expect(result.current.errors.name).toBe('Имя слишком короткое')
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('должен вызывать onSuccess и очищать ошибки при валидных данных', async () => {

    const onSuccess = vi.fn()
     const { result } = renderHook(() => useZodForm(testSchema, onSuccess))
    const formData = new FormData()
    formData.append('name', 'Ivan')
    
    await act(async() => {
        await result.current.handleAction(formData)
    })

    expect(result.current.errors).toEqual({})

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onSuccess).toHaveBeenCalledWith({ name: 'Ivan' })

  })
})
