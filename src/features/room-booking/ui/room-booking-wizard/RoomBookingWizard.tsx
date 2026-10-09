import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { DateStep } from '../steps/date-step'
import { ContactStep } from '../steps/contact-step'
import { PaymentStep } from '../steps/payment-step'
import { SuccessStep } from '../steps/success-step'
import { type BookingStep, getNextStep, getPrevStep } from '../../model'
import { RoomDetailsInfo, type Room } from '@/entities/room'
import { Button } from '@/shared/ui/button'
import styles from './RoomBookingWizard.module.scss'

interface RoomBookingWizardProps {
  room: Room
  step: BookingStep
  onStepChange: (step: BookingStep) => void
  date?: string
  time?: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

export const RoomBookingWizard = ({
  room,
  step,
  onStepChange,
  date,
  time,
  onDateChange,
  onTimeChange,
}: RoomBookingWizardProps) => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const isNextDisabled = step === 1 && (!date || !time)

  const handleNextStep = () => {
    const nextStep = getNextStep(step)
    if (nextStep) {
      onStepChange(nextStep)
    }
  }

  const handleBack = () => {
    const prevStep = getPrevStep(step)
    if (prevStep) {
      onStepChange(prevStep)
    }
  }

  const handlePaymentSubmit = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onStepChange(4)
    }, 1200)
  }

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  const isSubmitStep = step === 2 || step === 3

  const formId = step === 2 ? 'contact-form' : step === 3 ? 'payment-form' : undefined

  return (
    <div className={`${styles.wizardLayout} container`}>
      {step === 4 ? (
        <div className={styles.wizardSuccessWrapper}>
          <SuccessStep room={room} date={date} time={time} onGoHome={handleGoHome} />
        </div>
      ) : (
        <div className={styles.wizardLayoutContent}>
          <div className={styles.wizardMain}>
            {step === 1 && (
              <DateStep
                room={room}
                date={date}
                time={time}
                onSelectDate={onDateChange}
                onSelectTime={onTimeChange}
              />
            )}
            {step === 2 && <ContactStep onSuccess={handleNextStep} />}
            {step === 3 && <PaymentStep onPay={handlePaymentSubmit} isProcessing={isProcessing} />}
          </div>

          <aside className={styles.wizardSidebar}>
            <RoomDetailsInfo room={room} showPrice={false} variant="roomBooking" />

            <div className={styles.wizardControls}>
              {step > 1 && (
                <Button
                  type="button"
                  variant="bookingButton"
                  onClick={handleBack}
                  disabled={isProcessing}
                >
                  Back
                </Button>
              )}

              <Button
                key={step}
                type={isSubmitStep ? 'submit' : 'button'}
                form={formId}
                variant="bookingButton"
                onClick={isSubmitStep ? undefined : handleNextStep}
                disabled={isNextDisabled || isProcessing}
              >
                {step === 2
                  ? 'Go to Payment'
                  : step === 3
                    ? isProcessing
                      ? 'Processing...'
                      : 'Pay Now'
                    : 'Next'}
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
