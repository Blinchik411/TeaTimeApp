import clsx from 'clsx'
import styles from './ProgressBar.module.scss'

export type StepItem = {
  id: string
  label: string
}

interface ProgressBarProps {
  steps: StepItem[]
  activeStepIndex: number
  className?: string
}

export const ProgressBar = ({ steps, activeStepIndex, className = '' }: ProgressBarProps) => {
  const maxStepIndex = Math.max(steps.length - 1, 1)
  const currentPercent = Math.min(
    100,
    Math.max(0, Math.round((activeStepIndex / maxStepIndex) * 100)),
  )
  const containerClassName = clsx(styles.bookingProgressBar, className)

  return (
    <nav className={containerClassName}>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${currentPercent}%` }} />
        </div>

        <ul className={styles.progressSteps}>
          {steps.map((step, index) => {
            const isCompleted = index < activeStepIndex

            const stepClasses = styles.progressStep

            return (
              <li key={step.id} className={stepClasses}>
                <span className={styles.stepNumber}>{isCompleted ? '✓' : index + 1}</span>
                <span className={styles.stepLabel}>{step.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
