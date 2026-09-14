import {BookingHeader} from "@/widgets/booking-header";
import {Route} from "@/app/router/routes/booking";
import {RoomDetailsInfo, useRoom} from "@/entities/room";
import {DatePicker} from "@/shared/ui/date-picker";


export const BookingPage = () => {

    const { roomId } = Route.useSearch();
    const { room, loading, error } = useRoom(roomId);

    if (loading) return <div>Загрузка информации о комнате...</div>;
    if (error || !room) return <div>Ошибка: {error || 'Комната не найдена'}</div>;

    return (
        <div className="booking-page">
            <BookingHeader />
            <main>
                <RoomDetailsInfo room={room}/>
                <DatePicker/>
            </main>
        </div>
    );
};