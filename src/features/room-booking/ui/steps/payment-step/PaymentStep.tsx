import { useState } from 'react';
import { paymentSchema, type PaymentFormData } from '../../../model';
import { formatCardNumber, formatExpiryDate, formatCvc } from '../../../lib/paymentFormatters';
import styles from './PaymentStep.module.scss';
import { Icon } from "@/shared/ui/icon";
import { useZodForm } from "@/shared/lib/hooks/useZodForm";

interface PaymentStepProps {
    onPay?: (data: PaymentFormData) => void;
    isProcessing?: boolean;
}

export const PaymentStep = ({ onPay, isProcessing = false }: PaymentStepProps) => {
    const { errors, handleSubmit } = useZodForm(paymentSchema, onPay);

    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [showCvc, setShowCvc] = useState(false);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpiry((prev) => formatExpiryDate(e.target.value, prev));
    };

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvc(formatCvc(e.target.value));
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
                {isProcessing && (
                    <div className={styles.processingContainer}>
                        <div className={styles.processingBar}>
                            <div className={styles.processingBarFill} />
                        </div>
                        <p className={styles.processingText}>Processing payment securely...</p>
                    </div>
                )}

                <div className={styles.field}>
                    <input
                        type="text"
                        id="cardholder-name"
                        name="cardholderName"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Cardholder's name"
                        autoComplete="cc-name"
                        aria-label="Cardholder's name"
                        aria-invalid={Boolean(errors.cardholderName)}
                        aria-describedby={errors.cardholderName ? "cardholder-name-error" : undefined}
                        disabled={isProcessing}
                        className={errors.cardholderName ? styles.inputError : ''}
                    />
                    {errors.cardholderName && (
                        <span id="cardholder-name-error" className={styles.errorMessage} role="alert">
                            {errors.cardholderName}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="Card number (16 digits)"
                        maxLength={16}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        aria-label="Card number (16 digits)"
                        aria-invalid={Boolean(errors.cardNumber)}
                        aria-describedby={errors.cardNumber ? "card-number-error" : undefined}
                        disabled={isProcessing}
                        className={errors.cardNumber ? styles.inputError : ''}
                    />
                    {errors.cardNumber && (
                        <span id="card-number-error" className={styles.errorMessage} role="alert">
                            {errors.cardNumber}
                        </span>
                    )}
                </div>

                <div className={styles.formRow}>
                    <div className={styles.field}>
                        <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            aria-label="Expiration date (MM/YY)"
                            aria-invalid={Boolean(errors.expiry)}
                            aria-describedby={errors.expiry ? "expiry-error" : undefined}
                            disabled={isProcessing}
                            className={errors.expiry ? styles.inputError : ''}
                        />
                        {errors.expiry && (
                            <span id="expiry-error" className={styles.errorMessage} role="alert">
                                {errors.expiry}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <div className={styles.cvcWrapper}>
                            <input
                                type={showCvc ? "text" : "password"}
                                id="cvc"
                                name="cvc"
                                value={cvc}
                                onChange={handleCvcChange}
                                placeholder="CVC"
                                maxLength={4}
                                inputMode="numeric"
                                autoComplete="cc-csc"
                                aria-label="CVC security code"
                                aria-invalid={Boolean(errors.cvc)}
                                aria-describedby={errors.cvc ? "cvc-error" : undefined}
                                disabled={isProcessing}
                                className={`${errors.cvc ? styles.inputError : ''} ${styles.cvcInput}`}
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={() => setShowCvc((prev) => !prev)}
                                disabled={isProcessing}
                                aria-label={showCvc ? "Hide CVC" : "Show CVC"}
                            >
                                <Icon name={showCvc ? "EyeOff" : "Eye"} />
                            </button>
                        </div>
                        {errors.cvc && (
                            <span id="cvc-error" className={styles.errorMessage} role="alert">
                                {errors.cvc}
                            </span>
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