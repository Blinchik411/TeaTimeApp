import { useState } from 'react'

import { useZodForm } from '@/shared/lib/hooks/useZodForm'

import { contactSchema, type ContactFormData } from '../../../model'

import styles from './ContactStep.module.scss'

interface ContactStepProps {
  initialValues?: ContactFormData | null
  onSuccess: (data: ContactFormData) => void
}

export const ContactStep = ({ initialValues, onSuccess }: ContactStepProps) => {
  const { errors, handleSubmit, setErrors, getFieldId, getErrorId } = useZodForm(
    contactSchema,
    onSuccess,
  )

  const [values, setValues] = useState<ContactFormData>({
    firstName: initialValues?.firstName ?? '',
    lastName: initialValues?.lastName ?? '',
    phone: initialValues?.phone ?? '',
    email: initialValues?.email ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

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
              value={values.firstName}
              onChange={handleChange}
              placeholder="Name"
              autoComplete="given-name"
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
              value={values.lastName}
              onChange={handleChange}
              placeholder="Surname"
              autoComplete="family-name"
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
            value={values.phone}
            onChange={handleChange}
            placeholder="Phone"
            autoComplete="tel"
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
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
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
