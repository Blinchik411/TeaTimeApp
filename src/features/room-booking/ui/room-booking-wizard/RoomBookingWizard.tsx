import { useEffect, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'

import { RoomDetailsInfo, type Room } from '@/entities/room'
import { Button } from '@/shared/ui/button'

import { getLatestBookingReceipt } from '../../api/bookingApi'
import {
  getNextStep,
  getPrevStep,
  useCreateBooking,
  type BookingReceipt,
  type BookingStep,
  type ContactFormData,
  type PaymentFormData,
} from '../../model'
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
  const {
    mutateAsync: submitBooking,
    isPending: isProcessing,
    error: bookingError,
    reset: resetBookingError,
  } = useCreateBooking()
  const [bookingReceipt, setBookingReceipt] = useState<BookingReceipt | null>(() =>
    getLatestBookingReceipt(room.id),
  )
  const [contactData, setContactData] = useState<ContactFormData | null>(
    () => getLatestBookingReceipt(room.id)?.contact ?? null,
  )

  useEffect(() => {
    if (step === 3 && !contactData) {
      onStepChange(2)
    } else if (step === 4 && !contactData && !bookingReceipt) {
      onStepChange(1)
    }
  }, [step, contactData, bookingReceipt, onStepChange])

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
    resetBookingError()
    const prevStep = getPrevStep(step)
    if (prevStep) {
      onStepChange(prevStep)
    }
  }

  const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    if (!date || !time || !contactData) return

    try {
      const receipt = await submitBooking({
        roomId: room.id,
        date,
        time,
        contact: contactData,
        payment: paymentData,
      })
      setBookingReceipt(receipt)
      onStepChange(4)
    } catch {
      // Error is stored in bookingError mutation state and shown in PaymentStep
    }
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
            date={date || bookingReceipt?.date}
            time={time || bookingReceipt?.time}
            contact={contactData || bookingReceipt?.contact}
            bookingRef={bookingReceipt?.bookingRef}
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
            {step === 3 && (
              <PaymentStep
                onPay={handlePaymentSubmit}
                isProcessing={isProcessing}
                errorMessage={
                  bookingError
                    ? 'Payment could not be processed. Please check your card details and try again.'
                    : null
                }
              />
            )}
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
