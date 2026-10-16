import { useId, useState, type SyntheticEvent } from 'react'

import { type z } from 'zod'

export function useZodForm<T extends z.ZodTypeAny>(
  schema: T,
  onSuccess?: (data: z.infer<T>) => void | Promise<void>,
) {
  type FieldKey = keyof z.infer<T> & string
  type FormErrors = Partial<Record<FieldKey, string>>

  const formId = useId()
  const [errors, setErrors] = useState<FormErrors>({})

  const getFieldId = (fieldKey: FieldKey) => `${formId}-${fieldKey}`
  const getErrorId = (fieldKey: FieldKey) => `${formId}-${fieldKey}-error`

  const validate = (formData: FormData): z.infer<T> | null => {
    const rawData = Object.fromEntries(formData.entries())
    const result = schema.safeParse(rawData)

    if (!result.success) {
      const parsedErrors: FormErrors = {}

      result.error.issues.forEach((issue) => {
        const fieldKey = issue.path[0] as FieldKey | undefined
        if (fieldKey && !parsedErrors[fieldKey]) {
          parsedErrors[fieldKey] = issue.message
        }
      })

      setErrors(parsedErrors)
      return null
    }

    setErrors({})
    return result.data
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = validate(new FormData(e.currentTarget))
    if (data) {
      await onSuccess?.(data)
    }
  }

  const handleAction = async (formData: FormData) => {
    const data = validate(formData)
    if (data) {
      await onSuccess?.(data)
    }
  }

  return {
    errors,
    handleSubmit,
    handleAction,
    setErrors,
    formId,
    getFieldId,
    getErrorId,
  }
}
