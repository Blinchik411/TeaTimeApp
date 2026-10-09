import { type Room } from '@/entities/room'
import styles from './ExperienceSection.module.scss'
import { RouterButton } from '@/shared/ui/router-button'

interface ExperienceSectionProps {
  room: Room
}

export const ExperienceSection = ({ room }: ExperienceSectionProps) => {
  const { experience } = room

  return (
    <section className={styles.experience}>
      <div className="container">
        <div className={styles.experienceRow}>
          <div className={styles.experienceSteps}>
            <h2 className={styles.experienceTitle}>How It Goes</h2>
            <p className={styles.experienceLead}>
              The ceremony lasts around <strong>{experience.durationText}</strong> and unfolds step
              by step:
            </p>
            <ol className={styles.experienceList}>
              {experience.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <p className={styles.experienceText}>
              The tea master explains the meaning of each stage and shares stories about tea
              traditions.
            </p>
          </div>

          <div>
            <h2 className={styles.experienceTitle}>Included in the Experience</h2>
            <ul className={styles.includesList}>
              {experience.includes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.experienceBooking}>
          <h2 className={styles.experienceTitle}>Booking Info</h2>
          <p className={styles.bookingText}>
            Tea ceremonies are available daily at{' '}
            {experience.bookingTimes.map((time, idx) => (
              <span key={time}>
                <time dateTime={time}>
                  <strong>{time}</strong>
                </time>
                {idx < experience.bookingTimes.length - 1 ? ', ' : ''}
              </span>
            ))}
            .
            <br />
            Group size: <strong>{experience.groupSizeText}</strong>
          </p>
        </div>

        <RouterButton to={'/booking'} search={{ roomId: room.id }} variant="experienceButton">
          Book now
        </RouterButton>
      </div>
    </section>
  )
}
