import styles from './ProgressBar.module.scss';
import clsx from "clsx";

export type StepItem = {
    id: string;
    label: string;
};

interface ProgressBarProps {
    steps: StepItem[];
    activeStepIndex: number;
    className?: string;
}

const STEP_PERCENTAGES = ['0', '33', '70', '100'];

export const ProgressBar = ({ steps, activeStepIndex, className = '' }: ProgressBarProps) => {


    const currentPercent = STEP_PERCENTAGES[activeStepIndex] ?? '0';

    const containerClassName = `${styles.bookingProgressBar} ${className}`.trim();

    return (
        <nav className={containerClassName}>
            <ul className={styles.progressSteps}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${currentPercent}%` }}
                    />
                </div>

                {steps.map((step, index) => {
                    const isCompleted = index < activeStepIndex;
                    const isActive = index === activeStepIndex;

                    const stepClasses = clsx(styles.progressStep, {
                        [styles.completed]: isCompleted,
                        [styles.active]: isActive,
                    });

                    return (
                        <li key={step.id} className={stepClasses}>
                            <span className={styles.stepNumber}>
                                {isCompleted ? '✓' : index + 1}
                            </span>
                            <span className={styles.stepLabel}>{step.label}</span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};