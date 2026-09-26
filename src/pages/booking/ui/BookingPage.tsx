import { BookingHeader } from "@/widgets/booking-header";
import { Route } from "@/app/router/routes/booking";
import { useRoom } from "@/entities/room";
import { RoomBookingWizard } from "@/features/room-booking/ui/room-booking-wizard/RoomBookingWizard";

export const BookingPage = () => {
    const { roomId, step = 1 } = Route.useSearch();
    const navigate = Route.useNavigate();
    const { room, loading, error } = useRoom(roomId);

    const handleStepChange = (newStep: 1 | 2 | 3) => {
        navigate({
            search: (oldSearch) => ({
                ...oldSearch,
                step: newStep,
            }),
        });
    };

    if (loading) return <div>Загрузка информации о комнате...</div>;
    if (error || !room) return <div>Ошибка: {error || 'Комната не найдена'}</div>;

    const currentStep = (step >= 1 && step <= 3 ? step : 1) as 1 | 2 | 3;

    return (
        <div className="booking-page">
            <BookingHeader activeStepIndex={currentStep - 1} />

            <main>
                <RoomBookingWizard
                    room={room}
                    step={currentStep}
                    onStepChange={handleStepChange}
                />
            </main>
        </div>
    );
};