import { Logo } from "@/shared/ui/logo";
import { ProgressBar, type StepItem } from "@/shared/ui/progress-bar/ProgressBar";
import styles from './BookingHeader.module.scss';

const BOOKING_STEPS: StepItem[] = [
    { id: 'date', label: 'date' },
    { id: 'contact', label: 'contact' },
    { id: 'payment', label: 'payment' },
];

interface BookingHeaderProps {
    activeStepIndex: number;
}

export const BookingHeader = ({ activeStepIndex }: BookingHeaderProps) => {
    return (
        <header className={`${styles.header} container`}>
            <Logo />
            <ProgressBar
                steps={BOOKING_STEPS}
                activeStepIndex={activeStepIndex}
            />
        </header>
    );
};