import {paymentSchema, type PaymentFormData} from '@/features/room-booking/model';
import styles from './PaymentStep.module.scss';
import {Icon} from "@/shared/ui/Icon";
import {useZodForm} from "@/shared/lib/hooks/useZodForm";

interface PaymentStepProps {
    onPay?: (data: PaymentFormData) => void;
}

export const PaymentStep = ({ onPay }: PaymentStepProps) => {
    const { errors, handleSubmit } = useZodForm(paymentSchema, onPay);

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
                <div className={styles.paymentMethods}>
                    <Icon
                        name={"Visa"}
                    />
                    <Icon
                        name={"Stripe"}
                    />
                    <Icon
                        name={"PayPal"}
                    />
                    <Icon
                    name={"MasterCard"}
                    />
                    <Icon
                        name={"GooglePay"}
                    />
                </div>
            </form>
        </section>
    );
};