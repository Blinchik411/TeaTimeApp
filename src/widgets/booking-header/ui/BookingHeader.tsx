import {Logo} from "@/shared/ui/logo";
import styles from './BookingHeader.module.scss'
import {ProgressBar} from "@/shared/ui/progress-bar";
import type {StepItem} from "@/shared/ui/progress-bar/ProgressBar";


export const BookingHeader = () => {

    const BOOKING_STEPS: StepItem[] = [
        { id: 'date', label: 'date' },
        { id: 'contact', label: 'contact' },
        { id: 'payment', label: 'payment' },
    ];

    return (
        <header className={`${styles.header} container`}>
            <Logo/>
            <ProgressBar steps={BOOKING_STEPS} activeStepIndex={0}/>
        </header>

    )
}