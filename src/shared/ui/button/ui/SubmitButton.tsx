import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from './Button'

export type SubmitButtonProps = Omit<ButtonProps, 'type' | 'isLoading'>

export const SubmitButton = ({ children, loadingText, disabled, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      loadingText={loadingText}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  )
}
