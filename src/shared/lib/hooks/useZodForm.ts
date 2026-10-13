import { useState, useId, type SyntheticEvent } from 'react'
import { type z } from 'zod'

export function useZodForm<T extends z.ZodTypeAny>(
  schema: T,
  onSuccess?: (data: z.infer<T>) => void,
) {
  type FieldKey = keyof z.infer<T> & string
  type FormErrors = Partial<Record<FieldKey, string>>

  const formId = useId()
  const [errors, setErrors] = useState<FormErrors>({})

  const getFieldId = (fieldKey: FieldKey) => `${formId}-${fieldKey}`
  const getErrorId = (fieldKey: FieldKey) => `${formId}-${fieldKey}-error`

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
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
      return
    }

    setErrors({})
    onSuccess?.(result.data)
  }

  return {
    errors,
    handleSubmit,
    setErrors,
    formId,
    getFieldId,
    getErrorId,
  }
}
