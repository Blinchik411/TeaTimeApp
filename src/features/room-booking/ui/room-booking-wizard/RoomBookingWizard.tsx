import { DateStep } from '@/features/room-booking/ui/steps/date-step';
// import { ContactStep } from '@/features/room-booking/ui/steps/contact-step';
// import { PaymentStep } from '@/features/room-booking/ui/steps/payment-step';
import { RoomDetailsInfo, type RoomPreview } from '@/entities/room';
import { Button } from '@/shared/ui/button';
import styles from './RoomBookingWizard.module.scss';

interface RoomBookingWizardProps {
    room: RoomPreview;
    step: 1 | 2 | 3;
    onStepChange: (step: 1 | 2 | 3) => void;
}

export const RoomBookingWizard = ({ room, step, onStepChange }: RoomBookingWizardProps) => {

    const handleNext = () => {
        if (step < 3) onStepChange((step + 1) as 1 | 2 | 3);
    };

    const handleBack = () => {
        if (step > 1) onStepChange((step - 1) as 1 | 2 | 3);
    };

    return (
        <div className={`${styles.wizardLayout} container`}>
            <div className={styles.wizardLayoutContent}>
                <div className={styles.wizardMain}>
                    {step === 1 && <DateStep room={room} />}
                    {step === 2 && <ContactStep />}
                    {step === 3 && <PaymentStep />}
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
                                variant="heroButton"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        )}

                        <Button
                            type="button"
                            variant="heroButton"
                            onClick={handleNext}
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