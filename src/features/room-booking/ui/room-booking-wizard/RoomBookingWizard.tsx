import { useEffect, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'

import { RoomDetailsInfo, type Room } from '@/entities/room'
import { Button } from '@/shared/ui/button'

import { getNextStep, getPrevStep, type BookingStep, type ContactFormData } from '../../model'
import { ContactStep } from '../steps/contact-step'
import { DateStep } from '../steps/date-step'
import { PaymentStep } from '../steps/payment-step'
import { SuccessStep } from '../steps/success-step'

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
  const [contactData, setContactData] = useState<ContactFormData | null>(null)

  useEffect(() => {
    if (step === 3 && !contactData) {
      onStepChange(2)
    } else if (step === 4 && !contactData) {
      onStepChange(1)
    }
  }, [step, contactData, onStepChange])

  const isNextDisabled = step === 1 && (!date || !time)

  const handleNextStep = () => {
    const nextStep = getNextStep(step)
    if (nextStep) {
      onStepChange(nextStep)
    }
  }

  const handleContactSuccess = (data: ContactFormData) => {
    setContactData(data)
    handleNextStep()
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
    <div className={clsx(styles.wizardLayout, 'container')}>
      {step === 4 ? (
        <div className={styles.wizardSuccessWrapper}>
          <SuccessStep
            room={room}
            date={date}
            time={time}
            contact={contactData}
            onGoHome={handleGoHome}
          />
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
            {step === 2 && (
              <ContactStep initialValues={contactData} onSuccess={handleContactSuccess} />
            )}
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
                disabled={isNextDisabled}
                isLoading={step === 3 && isProcessing}
                loadingText="Processing..."
              >
                {step === 2 ? 'Go to Payment' : step === 3 ? 'Pay Now' : 'Next'}
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
