import { useState } from "react";
import { Logo } from "@/shared/ui/logo";
import { ProgressBar, type StepItem } from "@/shared/ui/progress-bar/ProgressBar";
import styles from './BookingHeader.module.scss';

const BOOKING_STEPS: StepItem[] = [
    { id: 'date', label: 'date' },
    { id: 'contact', label: 'contact' },
    { id: 'payment', label: 'payment' },
];

export const BookingHeader = () => {

    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const handleNext = () => {
        setActiveStepIndex((prev) => Math.min(prev + 1, BOOKING_STEPS.length - 1));
    };

    const handleBack = () => {
        setActiveStepIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <>
            <header className={`${styles.header} container`}>
                <Logo />
                <ProgressBar
                    steps={BOOKING_STEPS}
                    activeStepIndex={activeStepIndex}
                />
            </header>
            <main>
                <button
                    type="button"
                    onClick={handleBack}
                    disabled={activeStepIndex === 0}
                >
                    click back
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeStepIndex === BOOKING_STEPS.length - 1}
                >
                    click next
                </button>
            </main>
        </>

    );
};