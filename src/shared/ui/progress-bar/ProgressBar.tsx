import styles from './ProgressBar.module.scss';

export type StepItem = {
    id: string;
    label: string;
};

interface ProgressBarProps {
    steps: StepItem[];
    activeStepIndex: number;
    className?: string;
}

export const ProgressBar = ({ steps, activeStepIndex, className = '' }: ProgressBarProps) => {
    const progressPercent = steps.length > 1
        ? (activeStepIndex / (steps.length - 1)) * 100
        : 0;

    return (
        <nav className={`${styles.bookingProgressBar} ${className}`.trim()}>
            <ul className={styles.progressSteps}>
                {/* Полоса прогресса позиционируется внутри списка */}
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {steps.map((step, index) => {
                    const isCompleted = index < activeStepIndex;
                    const isActive = index === activeStepIndex;

                    const stepClasses = [
                        styles.progressStep,
                        isCompleted ? styles.completed : '',
                        isActive ? styles.active : '',
                    ].filter(Boolean).join(' ');

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