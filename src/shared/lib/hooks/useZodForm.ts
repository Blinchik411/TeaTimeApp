import { useState, type SyntheticEvent } from 'react'
import { type z } from 'zod'

export function useZodForm<T extends z.ZodTypeAny>(
  schema: T,
  onSuccess?: (data: z.infer<T>) => void,
) {
  type FieldKey = keyof z.infer<T> & string
  type FormErrors = Partial<Record<FieldKey, string>>

  const [errors, setErrors] = useState<FormErrors>({})

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
  }
}
