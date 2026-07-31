import { Link } from '@tanstack/react-router';
import { RoomExperience } from '@/entities/room/model/types';
import styles from './ExperienceSection.module.scss'

interface ExperienceSectionProps {
    roomId: string;
    experience: RoomExperience;
}

export const ExperienceSection = ({ roomId, experience }: ExperienceSectionProps) => {
    return (
        <section className={styles.experience}>
            <div className="container">
                <div className={styles.experienceRow}>
                    {/* Как всё проходит */}
                    <div className={styles.experienceSteps}>
                        <h2 className={styles.experienceTitle}>How It Goes</h2>
                        <p className={styles.experienceLead}>
                            The ceremony lasts around <strong>{experience.durationText}</strong> and unfolds step by step:
                        </p>
                        <ol className={styles.experienceList}>
                            {experience.steps.map((step, idx) => (
                                <li key={idx} className={styles.experienceItem}>{step}</li>
                            ))}
                        </ol>
                        <p className={styles.experienceText}>
                            The tea master explains the meaning of each stage and shares stories about tea traditions.
                        </p>
                    </div>

                    {/* Что включено */}
                    <div className={styles.experienceIncludes}>
                        <h2 className={styles.experienceTitle}>Included in the Experience</h2>
                        <ul className={styles.includesList}>
                            {experience.includes.map((item, idx) => (
                                <li key={idx} className={styles.includesItem}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Инфо о бронировании */}
                <div className={styles.experienceBooking}>
                    <h2 className={styles.experienceTitle}>Booking Info</h2>
                    <p className={styles.bookingText}>
                        Tea ceremonies are available daily at{' '}
                        {experience.bookingTimes.map((time, idx) => (
                            <span key={time}>
                <time dateTime={time}><strong>{time}</strong></time>
                                {idx < experience.bookingTimes.length - 1 ? ', ' : ''}
              </span>
                        ))}.
                        <br />
                        Group size: <strong>{experience.groupSizeText}</strong>
                    </p>
                </div>

                <Link to="/booking" search={{ roomId }} className={`${styles.experienceButton} button`}>
                    Book now
                </Link>
            </div>
        </section>
    );
};