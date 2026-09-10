import styles from './RoomSummary.module.scss';


const RoomSummaryProps: {

}

export const RoomSummary = () => {
    return (
        <div className={styles.room}>
            <h2 className={styles.roomName}>The Ceremony Room</h2>
            <p className={styles.roomText}>
                The ceremony includes a guided tea ritual, introduction to traditional
                Chinese techniques, tasting of selected teas, and an explanation of each
                step and its meaning.
            </p>
            <div className={styles.roomInfo}>
                <span className={styles.peopleCount}>1–3 people</span>
                <span className={styles.timeDuration}>75 min</span>
            </div>
        </div>
    );
};