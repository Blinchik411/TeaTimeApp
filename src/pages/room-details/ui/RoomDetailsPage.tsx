import { Route } from '@/app/router/routes/room/$roomId';
import { useRoom } from '@/entities/room/model/useRoom';
import {RoomHeader} from "@/widgets/RoomHeader/ui/RoomHeader";
import {ExperienceSection} from "@/pages/room-details/ui/ExperienceSection/ExperienceSection";
import {Footer} from "@/widgets/Footer";
import {ReviewsSection} from "@/pages/room-details/ui/ReviewSection/ReviewSection";


export const RoomDetailsPage = () => {

    const { roomId } = Route.useParams();
    const { room, loading, error } = useRoom(roomId);

    if (loading) return <div>Загрузка информации о комнате...</div>;
    if (error || !room) return <div>Ошибка: {error || 'Комната не найдена'}</div>;

    return (
<>
    <RoomHeader room={room}/>
    <ExperienceSection room={room}/>
    <ReviewsSection reviews={room.reviews}/>
    <Footer theme={'light'}/>
</>
    );
};