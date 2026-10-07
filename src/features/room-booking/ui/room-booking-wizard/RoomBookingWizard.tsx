import { DateStep } from '../steps/date-step';
import { ContactStep } from '../steps/contact-step';
import { PaymentStep } from '../steps/payment-step';
import { RoomDetailsInfo, type RoomPreview } from '@/entities/room';
import { Button } from '@/shared/ui/button';
import styles from './RoomBookingWizard.module.scss';

interface RoomBookingWizardProps {
    room: RoomPreview;
    step: 1 | 2 | 3;
    onStepChange: (step: 1 | 2 | 3) => void;
    date?: string;
    time?: string;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
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
    const isNextDisabled = step === 1 && (!date || !time);

    const handleNextStep = () => {
        if (step < 3) onStepChange((step + 1) as 1 | 2 | 3);
    };

    const handleBack = () => {
        if (step > 1) onStepChange((step - 1) as 1 | 2 | 3);
    };

    const handlePaymentSubmit = (data: unknown) => {
        console.log('Payment data:', data);
    };

    const isSubmitStep = step === 2 || step === 3;

    const formId = step === 2
        ? 'contact-form'
        : step === 3
            ? 'payment-form'
            : undefined;

    return (
        <div className={`${styles.wizardLayout} container`}>
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
                    {step === 2 && <ContactStep onSuccess={handleNextStep} />}
                    {step === 3 && <PaymentStep onPay={handlePaymentSubmit} />}
                </div>

                <aside className={styles.wizardSidebar}>
                    <RoomDetailsInfo
                        room={room}
                        showPrice={false}
                        variant="roomBooking"
                    />

                    <div className={styles.wizardControls}>
                        {step > 1 && (
                            <Button
                                type="button"
                                variant="bookingButton"
                                onClick={handleBack}
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
                        >
                            {step === 2
                                ? 'Go to Payment'
                                : step === 3
                                    ? 'Pay Now'
                                    : 'Next'}
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
};