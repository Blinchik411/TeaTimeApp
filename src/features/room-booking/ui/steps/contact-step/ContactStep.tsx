import { useState, type FormEvent } from 'react';
import { contactSchema} from '@/features/room-booking/model/contact.schema'
import styles from './ContactStep.module.scss';


export const ContactStep = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());


        const result = contactSchema.safeParse(rawData);

        if (!result.success) {

            const fieldErrors: Record<string, string> = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0]?.toString();
                if (fieldName && !fieldErrors[fieldName]) {
                    fieldErrors[fieldName] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
    };

    return (
        <section>
            <h1 className={styles.bookingTitle}>Contact details</h1>
            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>

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