export type BookingStep = 1 | 2 | 3 | 4

export const getNextStep = (step: BookingStep): BookingStep | null =>
  step < 4 ? ((step + 1) as BookingStep) : null

export const getPrevStep = (step: BookingStep): BookingStep | null =>
  step > 1 && step < 4 ? ((step - 1) as BookingStep) : null
