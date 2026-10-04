import { contactSchema } from '@/features/room-booking/model/contact.schema';
import { useZodForm } from '@/shared/lib/hooks/useZodForm';
import styles from './ContactStep.module.scss';

interface ContactStepProps {
    onSuccess: () => void;
}

export const ContactStep = ({ onSuccess }: ContactStepProps) => {
    const { errors, handleSubmit } = useZodForm(contactSchema, onSuccess);

    return (
        <section>
            <h1 className={styles.bookingTitle}>Contact details</h1>
            <form
                id="contact-form"
                className={styles.contactForm}
                onSubmit={handleSubmit}
                noValidate
            >
                <div className={styles.formRow}>
                    <div className={styles.field}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Name"
                            className={errors.firstName ? styles.inputError : ''}
                        />
                        {errors.firstName && (
                            <span className={styles.errorMessage}>{errors.firstName}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Surname"
                            className={errors.lastName ? styles.inputError : ''}
                        />
                        {errors.lastName && (
                            <span className={styles.errorMessage}>{errors.lastName}</span>
                        )}
                    </div>
                </div>

                <div className={styles.field}>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className={errors.phone ? styles.inputError : ''}
                    />
                    {errors.phone && (
                        <span className={styles.errorMessage}>{errors.phone}</span>
                    )}
                </div>

                <div className={styles.field}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={errors.email ? styles.inputError : ''}
                    />
                    {errors.email && (
                        <span className={styles.errorMessage}>{errors.email}</span>
                    )}
                </div>
            </form>
        </section>
    );
};