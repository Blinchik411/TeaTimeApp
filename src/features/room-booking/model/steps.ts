export type BookingStep = 1 | 2 | 3 | 4

export const getNextStep = (step: BookingStep): BookingStep | null => {
  switch (step) {
    case 1:
      return 2
    case 2:
      return 3
    case 3:
      return 4
    case 4:
      return null
  }
}

export const getPrevStep = (step: BookingStep): BookingStep | null => {
  switch (step) {
    case 2:
      return 1
    case 3:
      return 2
    default:
      return null
  }
}
