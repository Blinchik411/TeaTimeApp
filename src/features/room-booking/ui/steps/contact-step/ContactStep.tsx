import { useZodForm } from '@/shared/lib/hooks/useZodForm'

import { contactSchema } from '../../../model'

import styles from './ContactStep.module.scss'

interface ContactStepProps {
  onSuccess: () => void
}

export const ContactStep = ({ onSuccess }: ContactStepProps) => {
  const { errors, handleSubmit, getFieldId, getErrorId } = useZodForm(contactSchema, onSuccess)

  return (
    <section>
      <h1 className={styles.bookingTitle}>Contact details</h1>
      <form id="contact-form" className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <input
              type="text"
              id={getFieldId('firstName')}
              name="firstName"
              placeholder="Name"
              aria-label="Name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? getErrorId('firstName') : undefined}
              className={errors.firstName ? styles.inputError : ''}
            />
            {errors.firstName && (
              <span id={getErrorId('firstName')} className={styles.errorMessage} role="alert">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              id={getFieldId('lastName')}
              name="lastName"
              placeholder="Surname"
              aria-label="Surname"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? getErrorId('lastName') : undefined}
              className={errors.lastName ? styles.inputError : ''}
            />
            {errors.lastName && (
              <span id={getErrorId('lastName')} className={styles.errorMessage} role="alert">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <input
            type="tel"
            id={getFieldId('phone')}
            name="phone"
            placeholder="Phone"
            aria-label="Phone"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? getErrorId('phone') : undefined}
            className={errors.phone ? styles.inputError : ''}
          />
          {errors.phone && (
            <span id={getErrorId('phone')} className={styles.errorMessage} role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            id={getFieldId('email')}
            name="email"
            placeholder="Email"
            aria-label="Email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? getErrorId('email') : undefined}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && (
            <span id={getErrorId('email')} className={styles.errorMessage} role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </form>
    </section>
  )
}
