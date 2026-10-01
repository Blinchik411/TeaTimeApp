import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/app/router/routes/booking';
import { DatePicker } from '@/shared/ui/date-picker';
import { TimePicker } from '@/shared/ui/time-picker';
import { type RoomPreview} from '@/entities/room';
import { format } from 'date-fns';
import styles from './DateStep.module.scss'

interface DateStepProps {
    room: RoomPreview;
}

export const DateStep = ({ room }: DateStepProps) => {
    const navigate = useNavigate({ from: '/booking' });
    const { date, time } = Route.useSearch();

    const selectedDate = date ? new Date(date) : undefined;

    const bookingTimes = room?.experience.bookingTimes ?? [];

    const handleSelectDate = (newDate: Date | undefined) => {
        if (!newDate) return;

        const formattedDate = format(newDate, 'yyyy-MM-dd');

        navigate({
            search: (prev) => ({ ...prev, date: formattedDate }),
        });
    };

    const handleSelectTime = (selectedTime: string) => {
        navigate({
            search: (prev) => ({ ...prev, time: selectedTime }),
        });
    };

    return (
        <div
            className={styles.dateLayout}
        >
            <h2
                className={styles.bookingTitle}
            >
                Reserve your date
            </h2>
            <DatePicker
                className={styles.calendar}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
            />
            <TimePicker
                slots={bookingTimes}
                selectedTime={time}
                onSelectTime={handleSelectTime}
            />

        </div>
    );
};