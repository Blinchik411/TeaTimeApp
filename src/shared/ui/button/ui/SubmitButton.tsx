import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './Button'

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  loadingText?: string
}

export const SubmitButton = ({
  children,
  loadingText,
  disabled,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={disabled || pending} {...props}>
      {pending && loadingText ? loadingText : children}
    </Button>
  )
}
