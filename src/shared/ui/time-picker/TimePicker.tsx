import clsx from 'clsx';
import styles from './TimePicker.module.scss';

interface TimePickerProps {
    slots: string[];
    selectedTime?: string;
    onSelectTime: (time: string) => void;
    className?: string;
}

export const TimePicker = ({
                               slots,
                               selectedTime,
                               onSelectTime,
                               className = ''
                           }: TimePickerProps) => {
    return (
        <div className={clsx(styles.timeSection, className)}>
            <h3 className={styles.timeSectionText}>Select a time</h3>
            <div className={styles.timeSlotsGrid}>
                {slots.map((slot) => {
                    const isSelected = slot === selectedTime;

                    return (
                        <button
                            key={slot}
                            type="button"
                            className={clsx(styles.timeSlotBtn, {
                                [styles.selected]: isSelected,
                            })}
                            onClick={() => onSelectTime(slot)}
                        >
                            {slot}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};