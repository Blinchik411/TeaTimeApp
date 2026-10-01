import { useState, type FormEvent } from 'react';
import { paymentSchema, type PaymentFormData} from '@/features/room-booking/model';
import styles from './PaymentStep.module.scss';

interface PaymentStepProps {
    onPay: (data: PaymentFormData) => void;
}

export const PaymentStep = ({ onPay }: PaymentStepProps) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const result = paymentSchema.safeParse(rawData);

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
        onPay(result.data);
    };

    return (
        <section>
            <h1 className={styles.cardTitle}>Card details</h1>

            <form
                id="payment-form"
                className={styles.paymentForm}
                onSubmit={handleSubmit}
                noValidate
            >
                <div className={styles.field}>
                    <input
                        type="text"
                        name="cardholderName"
                        placeholder="Cardholder's name"
                        className={errors.cardholderName ? styles.inputError : ''}
                    />
                    {errors.cardholderName && (
                        <span className={styles.errorMessage}>{errors.cardholderName}</span>
                    )}
                </div>

                <div className={styles.field}>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card number (16 digits)"
                        maxLength={19}
                        className={errors.cardNumber ? styles.inputError : ''}
                    />
                    {errors.cardNumber && (
                        <span className={styles.errorMessage}>{errors.cardNumber}</span>
                    )}
                </div>

                <div className={styles.formRow}>
                    <div className={styles.field}>
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            className={errors.expiry ? styles.inputError : ''}
                        />
                        {errors.expiry && (
                            <span className={styles.errorMessage}>{errors.expiry}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            type="password"
                            name="cvc"
                            placeholder="CVC"
                            maxLength={4}
                            className={errors.cvc ? styles.inputError : ''}
                        />
                        {errors.cvc && (
                            <span className={styles.errorMessage}>{errors.cvc}</span>
                        )}
                    </div>
                </div>
            </form>
        </section>
    );
};