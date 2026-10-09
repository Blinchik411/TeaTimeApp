import { BookingHeader } from "@/widgets/booking-header";
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useRoom } from "@/entities/room";
import { RoomBookingWizard } from "@/features/room-booking";

export const BookingPage = () => {
    const { roomId, step = 1, date, time } = useSearch({ from: '/booking' });
    const navigate = useNavigate({ from: '/booking' });
    const { room, loading, error } = useRoom(roomId);

    const handleStepChange = (newStep: 1 | 2 | 3 | 4) => {
        navigate({
            search: (oldSearch) => ({
                ...oldSearch,
                step: newStep,
            }),
        });
    };

    const handleDateChange = (newDate: string) => {
        navigate({
            search: (oldSearch) => ({
                ...oldSearch,
                date: newDate,
            }),
        });
    };

    const handleTimeChange = (newTime: string) => {
        navigate({
            search: (oldSearch) => ({
                ...oldSearch,
                time: newTime,
            }),
        });
    };

    if (loading) {return <div>Загрузка информации о комнате...</div>;}
    if (error || !room) {return <div>Ошибка: {error || 'Комната не найдена'}</div>;}

    const currentStep = (step >= 1 && step <= 4 ? step : 1) as 1 | 2 | 3 | 4;

    return (
        <div className="booking-page">
            <BookingHeader activeStepIndex={currentStep - 1} />

            <main>
                <RoomBookingWizard
                    room={room}
                    step={currentStep}
                    onStepChange={handleStepChange}
                    date={date}
                    time={time}
                    onDateChange={handleDateChange}
                    onTimeChange={handleTimeChange}
                />
            </main>
        </div>
    );
};